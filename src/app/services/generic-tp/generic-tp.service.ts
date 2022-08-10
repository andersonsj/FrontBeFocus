import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericTpService {

  constructor(private http: HttpClient) { }

  public consultdictionaryTP(catalogName: any, selectedCountryTP?: any, selectedBirthDepartmentTP?:any): Observable<any> {

    let params = new HttpParams().append('catalogName', catalogName);

    if (catalogName == 'departamentos' && selectedCountryTP != null && selectedCountryTP != '') {
      params = new HttpParams().append('catalogName', catalogName)
        .append('field1', selectedCountryTP);
    }

    if (catalogName == 'ciudades' && selectedBirthDepartmentTP != null && selectedBirthDepartmentTP != '') {
      params = new HttpParams().append('catalogName', catalogName)
        .append('field1', selectedCountryTP).append('field3', selectedBirthDepartmentTP) ;
    }

    return this.http.get<any>(environment.apiUrl + 'befocusCrm/catalog', { params });
  }

}
