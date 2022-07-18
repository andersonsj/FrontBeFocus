import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTheme, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartComponent } from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  responsive?: ApexResponsive[];
  labels?: any;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-item-three',
  templateUrl: './dashboard-item-three.component.html',
  styleUrls: ['./dashboard-item-three.component.css']
})
export class DashboardItemThreeComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(
  ) {
    this.chartOptions = {
      series: [12, 12, 12, 12, 12, 12, 12, 14],
      chart: {
       width: "82%",
        type: "pie"
      },
      labels: [
        "Cliente directo", "Distribuidor Viralizador", "Distribuidor Validador", "Distribuidor Vendedor", "Distribuidor Apertura Mercador", "Colaborador", "Proveedor", "Vendedor"
      ],
      title: {
        text: "Porcentaje de terceros registrados por tipo"
      },
      responsive: [
        {
          breakpoint: 380,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }

  }

  ngOnInit(): void {
  }

}
