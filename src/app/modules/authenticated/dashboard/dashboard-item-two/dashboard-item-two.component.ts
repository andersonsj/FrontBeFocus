import { AuthService } from 'app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { StatisticsStageService } from '@services/statisticsStage/statistics-stage.service';
import { NotificationService } from '@services/notifications/notification.service';
import { ResponseLogin } from '@interface/responseLogin';

@Component({
  selector: 'app-dashboard-item-two',
  templateUrl: './dashboard-item-two.component.html',
  styleUrls: ['./dashboard-item-two.component.css']
})
export class DashboardItemTwoComponent implements OnInit {

  public currentUserMemory!: ResponseLogin;
  private currentYear: string = String(new Date().getFullYear());
  private lastYear: string = String(new Date().getFullYear() - 1);
  private quotesCurrentYear: number = 0;
  private quoteslastYear: number = 0;
  private orderCurrentYear: number = 0;
  private orderlastYear: number = 0;
  private invoiceCurrentYear: number = 0;
  private invoicelastYear: number = 0;

  constructor(private statisticsStageService: StatisticsStageService, private authService: AuthService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {

    this.loadGraphicInformation();

    this.authService.userCurrent.subscribe(data => {
      this.currentUserMemory = data;

      this.statisticsStageService.getStatisticsStageCRM(String(this.currentUserMemory), "1").subscribe(
        data => {

          switch (data.getListStatisticsStageDTO.resultDTO.resultCode) {
            case 1: {
              this.notificationService.showSuccess('Estadisticas consultadas.', '¡Estadisticas!')
              this.quoteslastYear = data.getListStatisticsStageDTO.statisticsStageDTOList[0].countRecords;
              this.orderlastYear = data.getListStatisticsStageDTO.statisticsStageDTOList[1].countRecords;
              this.invoicelastYear = data.getListStatisticsStageDTO.statisticsStageDTOList[2].countRecords;
              this.quotesCurrentYear = data.getListStatisticsStageDTO.statisticsStageDTOList[3].countRecords;
              this.orderCurrentYear = data.getListStatisticsStageDTO.statisticsStageDTOList[4].countRecords;
              this.invoiceCurrentYear = data.getListStatisticsStageDTO.statisticsStageDTOList[5].countRecords;
              this.loadGraphicInformation();
              break;
            }

            case 2: {
              this.notificationService.showError(data.getThirdPartyDTO.resultDTO.message, '¡Registro Fallido!');
              break;
            }
          }

        }
      );

    });


  }

 // view: [number, number] = [700, 400];

  multi = [
    {
      "name": "Orden",
      "series": [
        {
          "name": this.lastYear,
          "value": this.orderlastYear
        },
        {
          "name": this.currentYear,
          "value": this.orderCurrentYear
        }
      ]
    },

    {
      "name": "Cotizacion",
      "series": [
        {
          "name": this.lastYear,
          "value": this.quoteslastYear
        },
        {
          "name": this.currentYear,
          "value": this.quotesCurrentYear
        }
      ]
    },

    {
      "name": "Factura",
      "series": [
        {
          "name": this.lastYear,
          "value": this.invoicelastYear
        },
        {
          "name": this.currentYear,
          "value": this.invoiceCurrentYear
        }
      ]
    }
  ];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Documento comercial';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Cantidad registrada';
  legendTitle: string = 'Años';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['rgb(67, 145, 155)', 'rgb(19, 99, 223)', '#0ff']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public loadGraphicInformation() {
    this.multi = [
      {
        "name": "Orden",
        "series": [
          {
            "name": this.lastYear,
            "value": this.orderlastYear
          },
          {
            "name": this.currentYear,
            "value": this.orderCurrentYear
          }
        ]
      },

      {
        "name": "Cotizacion",
        "series": [
          {
            "name": this.lastYear,
            "value": this.quoteslastYear
          },
          {
            "name": this.currentYear,
            "value": this.quotesCurrentYear
          }
        ]
      },

      {
        "name": "Factura",
        "series": [
          {
            "name": this.lastYear,
            "value": this.invoicelastYear
          },
          {
            "name": this.currentYear,
            "value": this.invoiceCurrentYear
          }
        ]
      }
    ];
  }



}