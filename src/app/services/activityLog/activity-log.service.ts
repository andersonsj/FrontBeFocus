import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ActivityLogDTO } from '@interface/activityLogDTO';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  constructor(private http: HttpClient) { }

  public getActivityLog(userCode: string, companyCode: string): Observable<any> {
    let params = new HttpParams().append('userCode', userCode).append('companyCode', companyCode);
    return this.http.get<any>(environment.apiUrl + 'befocusCrm/getActivityLog', { params });
  }

  public createActivityLog(activityLogDTO: ActivityLogDTO): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/createActivityLog', activityLogDTO);
  }

}
