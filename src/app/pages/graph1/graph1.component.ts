import { Component } from '@angular/core';

import DoughnutChartInfo from '../../interfaces/DoughnutChartInfo';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {

  // Doughnuts
  doughnutChart1: DoughnutChartInfo = {
    title: 'Sales',
    labels: ['Download', 'In-Store', 'Mail-Order'],
    data: [300, 500, 100],
    colors: ['#6857E6', '#009FEE', '#F02059']
  }

  doughnutChart2: DoughnutChartInfo = {
    title: 'Shopping',
    labels: ['Tacos', 'Pizza', 'Sushi'],
    data: [100, 50, 10],
    colors: ['#5817E5', '#F11FEF', '#E01058']
  }

  doughnutChart3: DoughnutChartInfo = {
    title: 'Test',
    labels: ['T1', 'T2', 'T3'],
    data: [50, 50, 50],
    colors: ['#FFF119', '#111FFF', '#971558']
  }

  doughnutChart4: DoughnutChartInfo = {
    title: 'Something',
    labels: ['S1', 'S2', 'S3'],
    data: [10, 50, 10],
    colors: ['#333333', '#555555', '#888888']
  }

}
