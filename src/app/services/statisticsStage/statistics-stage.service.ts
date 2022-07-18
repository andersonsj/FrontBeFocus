import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '@services/notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsStageService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  public getStatisticsStageCRM(companyCode: string, processCode: string): Observable<any> {

    let params = new HttpParams().append('companyCode', companyCode).append('processCode', processCode);
    return this.http.get<any>('http://localhost:8090/api/befocusCrm/statisticStageProcess/listStatisticsStage', { params });
  }

}
