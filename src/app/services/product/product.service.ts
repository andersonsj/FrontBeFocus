import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProductsByCodeCompany(companyCode: string) {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.get<any>('http://localhost:8090/api/befocusCrm/getListProducts', { params });
  }

}
