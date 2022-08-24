import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseLogin } from '@interface/responseLogin';
import { AuthService } from '@services/auth/auth.service';
import { NotificationService } from '@services/notifications/notification.service';
import { ThirdPartyTypeService } from '@services/thirdPartyType/third-party-type.service';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartComponent } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
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

  public currentUserMemory!: ResponseLogin;

  constructor(private thirdPartyTypeService: ThirdPartyTypeService, private authService: AuthService, private notificationService: NotificationService) {

    let seriesChart: number[] = [];
    let labelsChart: number[] = [];

    this.authService.serieListDashboardMemory.subscribe(data => {
      seriesChart = data;
    });

    this.authService.labelListDashboardMemory.subscribe(data => {
      labelsChart = data;
    });

    this.chartOptions = {
      series: seriesChart,
      chart: {
        width: "80%",
        type: "pie"
      },
      labels: labelsChart,
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
    };

  }

  ngOnInit(): void {
  }


}
