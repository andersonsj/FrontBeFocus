import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@services/notifications/notification.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyTypeService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  public getstatisticsThirdPartyType(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>(environment.apiUrl + 'befocusCrm/statisticsThirdPartyType', { params });
  }

  public getAllThirdPartyType(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>(environment.apiUrl + 'befocusCrm/getAllThirdPartyType', { params });
  }


}
