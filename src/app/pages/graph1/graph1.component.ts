import { Component } from '@angular/core';

import { ChartData, Color } from 'chart.js';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public colors: string[] = ['#6857E6', '#009FEE', '#F02059'];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 350, 450, 100 ],
        backgroundColor: this.colors,
      }
    ]
  };

}
