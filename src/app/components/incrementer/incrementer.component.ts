import { Component, Input } from "@angular/core";


@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []

})
export class IncrementerComponent {

  // @Input('p1') progress: number = 20;
  @Input() progress: number = 20;

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      value = 0;
    }

    if (this.progress <= 0 && value < 0) {
      value = 0;
    }
    this.progress += value;
  }
}
