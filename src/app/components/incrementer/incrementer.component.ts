import { Component } from "@angular/core";


@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []

})
export class IncrementerComponent {
  progress: number = 20;

  get progressWithPercentage() {
    return `${this.progress}%`;
  }

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
