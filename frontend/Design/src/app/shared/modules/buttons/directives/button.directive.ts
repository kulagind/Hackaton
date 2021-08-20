import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {

  @Input()
  public fill: Readonly<'solid' | 'outline'> = 'solid';

  constructor(private readonly host: ElementRef<HTMLButtonElement>,
    private readonly renderer: Renderer2) {
  }

  public ngOnInit() {
    this.initializeHostClasses();
  }

  private initializeHostClasses() {
    this.renderer.addClass(this.host.nativeElement, 'button');
    this.renderer.addClass(this.host.nativeElement, `button_${this.fill}`);
  }

}
