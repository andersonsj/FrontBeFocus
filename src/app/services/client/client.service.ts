import { Router } from '@angular/router';
import { Observable, map, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CurrentClient } from '@interface/currentClient';
import { NotificationService } from '@services/notifications/notification.service';
import { RequestGetClient } from '@interface/requestGetClient';
import { RequestCreateClient } from '@interface/requestCreateClient';
import { RequestThirdPartyDTO } from '@interface/RequestThirdPartyDTO';
import { RequestThirdPartyAddressDTO } from '@interface/requestThirdPartyAddressDTO';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  @Output() currentClientData: EventEmitter<CurrentClient> = new EventEmitter();
  @Output() activateButtonUpdate: EventEmitter<Boolean> = new EventEmitter();
  @Output() activateButtonRegister: EventEmitter<Boolean> = new EventEmitter();
  @Output() activateRegister: EventEmitter<Boolean> = new EventEmitter();
  private errorMsg!: string;

  constructor(private http: HttpClient, private notificationService: NotificationService, private router: Router) { }

  public getClient(requestGetClient: RequestGetClient, showModal: Boolean): Observable<any> {
    let cliente: CurrentClient;
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/getThirdParty', requestGetClient).pipe(

      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError('Comuniquese al correo director.is@befocusgroup.com', '¡Error en la platafoma!');
        return '';
      }),

      map(result => {
        switch (result.status.code) {
          case '200': {

            switch (result.getThirdPartyDTO.resultDTO.resultCode) {
              case 1: {

                this.currentClientData.emit(
                  result.getThirdPartyDTO
                );

                this.activateButtonUpdate.emit(false);
                this.activateButtonRegister.emit(true);
                this.activateRegister.emit(true);
                this.notificationService.showSuccess('Cliente encontrado', '¡Consulta Exitosa!');

                break;
              }
              case 2: {

                this.currentClientData.emit(
                  cliente = {
                    typeDocument: requestGetClient.typeDocument, documentNumber: requestGetClient.documentNumber,
                    companyCode: requestGetClient.companyCode, bloodType: ''
                  }
                );

                this.activateButtonUpdate.emit(true);
                this.activateButtonRegister.emit(false);
                this.activateRegister.emit(true);
                this.notificationService.showInfo('Cliente no encontrado', '¡Consulta Exitosa!');

                if (showModal) {
                  this.showModal();
                }

                break;
              }
            }

            break;
          }
          case '500': {
            this.notificationService.showError('Comuniquese al correo director.is@befocusgroup.com', '¡Error en la platafoma!');
            break;
          }
        }
      }
      )
    );
  }

  public deleteCurrentClient() {
    //TODO Hacer metodo para borrar cache de cliente actual.
  }

  public createClient(requestCreateClient: RequestCreateClient): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/createThirdParty', requestCreateClient);
  }

  public updateClient(requestCreateClient: RequestCreateClient): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/updateThirdParty', requestCreateClient);
  }

  public getClientsByIdCompany(requestThirdPartyDTO: RequestThirdPartyDTO): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/getThirdPartyListByType', requestThirdPartyDTO);
  }

  public createAdress(requestCreateAdress: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/createThirdPartyAddress', requestCreateAdress);
  }

  public getAdressByClientId(requestThirdPartyAddressDTO: RequestThirdPartyAddressDTO): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/getThirdPartyAddressList', requestThirdPartyAddressDTO);
  }

  public getThirdPartyDistributorList(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/getThirdPartyListByCompany', params);
  }

  public getThirdPartyListByCompany(companyCode: string): Observable<any> {
    let params = new HttpParams().append('companyCode', companyCode);
    return this.http.post<any>(environment.apiUrl + 'befocusCrm/getThirdPartyListByCompany', params);
  }


  showModal() {
    Swal.fire({
      title: 'El cliente consultado no existe en el CRM',
      text: 'Debe crear el cliente en el CRM, para poder ingresar la orden.',
      icon: 'warning',
      showCancelButton: false,
      cancelButtonText: 'Salir',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Crear cliente',
      confirmButtonColor: '#0b5ed7',
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/home/authenticated/content-user/content-client']);
      }
    });
  }

}

