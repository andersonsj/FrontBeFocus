import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './../notifications/notification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  public getSellerCRMListByCompany(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.post<any>('http://localhost:8090/api/befocusCrm/getSellerCRMListByCompany', params);
  }

}
