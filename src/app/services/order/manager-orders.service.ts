import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderCRMDTO } from '@interface/orderCRMDTO';
import { OrderDetailCRMDTO } from '@interface/orderDetailCRMDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerOrdersService {

  constructor(private http: HttpClient) { }

  public crateOrder(orderCRMDTO: OrderCRMDTO): Observable<any> {
    return this.http.post<any>('http://localhost:8090/api/befocusCrm/createOrderCRM', orderCRMDTO);
  }

  public crateDetailOrder(orderDetailCRMDTO: OrderDetailCRMDTO): Observable<any> {
    return this.http.post<any>('http://localhost:8090/api/befocusCrm/createOrderDetailCRM', orderDetailCRMDTO);
  }

  public getOrder(orderCRMDTO: OrderCRMDTO): Observable<any> {
    return this.http.post<any>('http://localhost:8090/api/befocusCrm/getOrderCRM', orderCRMDTO);
  }

  public getOrderDetail(orderDetailCRMDTO: OrderDetailCRMDTO): Observable<any> {
    return this.http.post<any>('http://localhost:8090/api/befocusCrm/getOrderDetailCRM', orderDetailCRMDTO);
  }

  public getOrderDetailList(companyCode: string, orderCode: string): Observable<any> {

    let params = new HttpParams().append('companyCode', companyCode).append('orderCode', orderCode);

    return this.http.post<any>('http://localhost:8090/api/befocusCrm/getOrderDetailList', params);
  }

}
