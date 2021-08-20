import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { runTask } from '../chips-container/chips-container.component';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements AfterViewInit {

  @Input()
  public control: SelectionModel<string> = new SelectionModel<string>();
  public content: NonNullable<Readonly<string>>;

  @ViewChild('chip')
  private readonly chip: ElementRef<HTMLDivElement>;

  public toggle = () => this.control.toggle(this.content);

  public ngAfterViewInit() {
    this.content = this.chip.nativeElement.textContent ?? '';
  }

}
