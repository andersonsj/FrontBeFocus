import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }

  public getListDistributor(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>(environment.apiUrl + 'befocusCrm/getThirdPartyListDistributorByCompany', { params });
  }

}
