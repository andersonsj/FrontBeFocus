import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductThirdPartyDiscountService {

  constructor(private http: HttpClient) { }

  public getDiscountForProductByCompanyCodeAndDocumentNumberAndProductCodeAndTypeDocument(companyCode: string, documentNumber: string, productCode: string, typeDocument: string) {
    let params = new HttpParams()
      .append('companyCode', companyCode)
      .append('documentNumber', documentNumber)
      .append('productCode', productCode)
      .append('typeDocument', typeDocument);

    return this.http.get<any>(environment.apiUrl + 'befocusCrm/getProductThirdPartyDiscountByProductActive', { params });
  }

  public createProductThirdPartyDiscountByThirdParty(formGroup: FormGroup): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/createProductThirdPartyDiscountByThirdParty', formGroup);
  }

}
