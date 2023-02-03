import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []

})
export class IncrementerComponent {

  // @Input('p1') progress: number = 20;
  @Input() progress: number = 0;

  @Output() valueOutput: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      value = 0;
    }

    if (this.progress <= 0 && value < 0) {
      value = 0;
    }
    this.progress += value;

    this.valueOutput.emit(this.progress);
  }
}
