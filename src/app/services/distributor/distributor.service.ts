import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private http: HttpClient) { }

  public getListDistributor(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>('http://localhost:8090/api/befocusCrm/getThirdPartyListDistributorByCompany', { params });
  }

}
