import { Observable } from 'rxjs';
import { NotificationService } from './../notifications/notification.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StageProcessCRMService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  public getListStageProcessCRM(companyCode: string, processCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode).append('processCode', processCode);
    return this.http.get<any>('http://localhost:8090/api/befocusCrm/stageProcessCRM/listStageProcessCRM', { params });
  }

}
