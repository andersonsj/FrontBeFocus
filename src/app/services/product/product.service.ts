import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsByCodeCompany(companyCode: string) {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>(environment.apiUrl + 'befocusCrm/getListProducts', { params });
  }

}
