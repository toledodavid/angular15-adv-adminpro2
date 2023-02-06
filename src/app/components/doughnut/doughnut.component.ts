import { Component, Input, OnInit } from '@angular/core';
import { ChartData, Color } from 'chart.js';
import DoughnutChartInfo from '../../interfaces/DoughnutChartInfo';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  @Input('doughnutChart') chart: DoughnutChartInfo = {title: '', labels: [], data: [], colors: []};

  public doughnutChartData: ChartData<'doughnut'> = {datasets: []};

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.chart.labels,
      datasets: [
        {
          data: this.chart.data,
          backgroundColor: this.chart.colors,
        }
      ]
    };
  }



}
