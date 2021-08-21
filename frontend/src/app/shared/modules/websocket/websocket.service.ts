import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, SubscriptionLike, Subject, Observer, interval, ReplaySubject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { share, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { IWebsocketService, IWsMessage, WebSocketConfig } from './interfaces';
import { config } from './config';


@Injectable({
  'providedIn': 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

    private config: WebSocketSubjectConfig<IWsMessage<any>>;

    private websocketSub: SubscriptionLike;
    private statusSub: SubscriptionLike;

    private reconnection$: Observable<number>;
    private websocket$: WebSocketSubject<IWsMessage<any>>;
    private connection$: Observer<boolean>;
    private wsMessages$: Subject<IWsMessage<any>>;

    private reconnectInterval: number;
    private reconnectAttempts: number;
    private isConnected: boolean;

    private disconnect$ = new ReplaySubject<void>(1);

    public status: Observable<boolean>;

    constructor(
      @Inject(config) private wsConfig: WebSocketConfig
    ) {
        this.createConnection();
    }

    createConnection(): void {
        this.wsMessages$ = new Subject<IWsMessage<any>>();
      
        this.reconnectInterval = this.wsConfig.reconnectInterval || 5000; // pause between connections
        this.reconnectAttempts = this.wsConfig.reconnectAttempts || 10; // number of connection attempts
        
        this.config = {
            url: this.wsConfig.url,
            closeObserver: {
                next: (event: CloseEvent) => {
                    this.websocket$ = null;
                    this.connection$.next(false);
                }
            },
            openObserver: {
                next: (event: Event) => {
                    console.log('WebSocket connected!');
                    this.connection$.next(true);
                }
            }
        };
        
        // connection status
        this.status = new Observable<boolean>((observer) => {
            this.connection$ = observer;
        }).pipe(share(), distinctUntilChanged());
        
        // run reconnect if not connection
        this.statusSub = this.status
            .subscribe((isConnected) => {
                this.isConnected = isConnected;
        
                if (!this.reconnection$ && typeof(isConnected) === 'boolean' && !isConnected) {
                    this.reconnect();
                }
            });
        
        this.websocketSub = this.wsMessages$.subscribe(
            null, (error: ErrorEvent) => console.error('WebSocket error!', error)
        );
        
        this.connect();
    }

    ngOnDestroy() {
        this.websocketSub.unsubscribe();
        this.statusSub.unsubscribe();
    }


    /*
    * connect to WebSocked
    * */
    public connect(): void {
        this.websocket$ = new WebSocketSubject(this.config);
        
        this.websocket$.subscribe(
            (message) => this.wsMessages$.next(message),
            (error: Event) => {
                console.error('Connection error!', error);
                if (!this.websocket$) {
                    // run reconnect if errors
                    this.reconnect();
                }
            });
    }


    /*
    * reconnect if not connecting or errors
    * */
    private reconnect(): void {
        this.reconnection$ = interval(this.reconnectInterval)
            .pipe(
                takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$),
                takeUntil(this.disconnect$)
            );
        
        this.reconnection$.subscribe(
            () => this.connect(),
            null,
            () => {
                // Subject complete if reconnect attemts ending
                this.reconnection$ = null;
        
                if (!this.websocket$) {
                    this.wsMessages$.complete();
                    this.connection$.complete();
                }
            });
    }

    public disconnect(): void {
        this.disconnect$.next();
    }


    /*
    * on message event
    * */
    public on<T>(event: string): Observable<T> {
        if (event) {
            return this.wsMessages$.pipe(
                filter((message: IWsMessage<T>) => message.event === event),
                map((message: IWsMessage<T>) => message.data)
            );
        } else {
          throw new Error('Event doesn\'t exist');
        }
    }


    /*
    * on message to server
    * */
    public send(event: string, data: any = {}): void {
        if (event && this.isConnected) {
            this.websocket$.next({ event, data });
        } else {
            console.error('Send error!');
        }
    }

    get connected(): boolean {
        return this.isConnected;
    }

}
