import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";


@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []

})
export class IncrementerComponent implements OnInit {

  @Input() progress: number = 0;
  @Input('btnClass') btnClasses: string = 'btn-primary';

  @Output() valueOutput: EventEmitter<number> = new EventEmitter();


  ngOnInit() {
    this.btnClasses = `btn ${this.btnClasses}`;
  }

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
