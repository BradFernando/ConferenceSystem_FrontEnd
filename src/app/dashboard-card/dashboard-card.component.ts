import { Component } from '@angular/core';
import { ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  // Datos para el diagrama de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Conferencia 1', 'Conferencia 2', 'Conferencia 3'];
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [45, 37, 60], label: 'Artículos' }
  ];

  // Datos para el progress-spinner
  public progress = 50;

}
