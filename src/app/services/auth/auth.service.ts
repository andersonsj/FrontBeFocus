import { NotificationService } from './../notifications/notification.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ResponseLogin } from '@interface/responseLogin';
import { RequestLogin } from '@interface/requestLogin';
import { DatauserAuth } from '@interface/dataUserAuth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private responseLogin: ResponseLogin = { companyCode: 0 };
  private userMemory = new BehaviorSubject(this.responseLogin);
  public userCurrent = this.userMemory.asObservable();

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
  }

  public login(requestLogin: RequestLogin): Observable<any> {
    let data: DatauserAuth;

    return this.http.post<any>('http://localhost:8090/api/befocusCrm/login', requestLogin).pipe(
      map(result => {
        if (result.status.code == '200') {
          if (result.userAuthenticatedDTO.resultDTO.resultCode == 1) {
            data = { companyCode: result.userAuthenticatedDTO.getAdmCompanyCustomDTO.companyCode };
            this.userMemory.next(result.userAuthenticatedDTO.getAdmCompanyCustomDTO.companyCode);
            this.notificationService.showSuccess(result.userAuthenticatedDTO.getAdmCompanyCustomDTO.companyName, "Bienvenido");
            this.router.navigate(['/home/authenticated/content-user/dashboard']);
            return result;
          }

          if (result.userAuthenticatedDTO.resultDTO.resultCode == 2) {
            this.notificationService.showError("No existen en el sistema.", "Los datos ingresados");
          }

        } else if (result.status.code == '500') {
          this.notificationService.showError(result.status.message, "Error de autenticacion.");
        }
      })
    );
  }

  public logout() {
    let responseLogin: ResponseLogin = { companyCode: 0 };
    this.userMemory.next(responseLogin);
    this.router.navigate(['/home/auth/login']);
  }

}
