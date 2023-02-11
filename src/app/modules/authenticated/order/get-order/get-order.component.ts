import { AuthService } from 'app/services/auth/auth.service';
import { CacheTPService } from './../../../../services/cache/cache.service';
import { ClientService } from './../../../../services/client/client.service';
import { NotificationService } from './../../../../services/notifications/notification.service';
import { ManagerOrdersService } from './../../../../services/order/manager-orders.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { ResponseLogin } from '@interface/responseLogin';
import { OrderCRMDTO } from '@interface/orderCRMDTO';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent implements OnInit {

  public getOrderForm!: FormGroup;
  public getOrderDetailsForm!: FormGroup;
  public documentTypeTP: DocumentTypeTP[] = [];
  private currentClient!: ResponseLogin;
  public listProducts: any[] = [];

  constructor(private formBuilder: FormBuilder, private managerOrdersService: ManagerOrdersService,
    private notificationService: NotificationService, private cacheTPService: CacheTPService, private clientService: ClientService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
    this.consultTypeDocumentTP();

    this.authService.userCurrent.subscribe(data => {
      this.currentClient = data;
      this.getOrderForm.controls['companyCode'].setValue(data);
      this.getOrderDetailsForm.controls['companyCode'].setValue(data);
    });

  }

  private buildForm() {
    this.getOrderForm = this.formBuilder.group({
      orderCode: ['', Validators.required],
      companyCode: ['', Validators.required],
      typeDocument: [''],
      typeDocumentString: [''],
      documentNumber: [''],
      distributorCode: [''],
      totalValue: [''],
      sellerName: [''],
      sellerID: ['']
    });

    this.getOrderDetailsForm = this.formBuilder.group({
      orderCode: ['', Validators.required],
      companyCode: ['', Validators.required],
      productCode: ['', Validators.required],
      productName: [''],
      quantity: [''],
      price: [''],
      total: ['']
    });

  }

  crateOrder(orderCRMDTO: OrderCRMDTO) {
    this.managerOrdersService.crateOrder(orderCRMDTO).subscribe(data => {

      switch (data.status.code) {
        case 200: {
          break;
        }
        case 500: {
          this.notificationService.showError('Comuniquese al correo director.is@befocusgroup.com', '¡Error en la platafoma!');
          break;
        }

      }

    });
  }

  getOrderData() {
    this.getOrder(this.getOrderForm.value);
  }

  getOrderFormData(nameControl: string) {
    return this.getOrderForm.controls[nameControl].value;
  }

  setOrderFormData(nameControl: string, valueControl: string) {
    this.getOrderForm.controls[nameControl].setValue(valueControl);
  }

  getOrder(orderCRMDTO: OrderCRMDTO) {
    this.managerOrdersService.getOrder(orderCRMDTO).subscribe(data => {
      switch (data.status.code) {
        case '200': {

          switch (data.getOrderCRMDTO.resultDTO.resultCode) {
            case 1: {
              this.notificationService.showSuccess('Consultando el pedido ingresado.', '!Exito!');
              this.assignValuesToControlsOrder(data);
              this.getOrderDetailList(data.getOrderCRMDTO.companyCode, data.getOrderCRMDTO.orderCode);
              break;
            }
            case 2: {
              this.notificationService.showInfo('No se encontro la orden consultada', '¡La orden no existe!');
              break;
            }
          }

          break;
        }
        case '500': {
          this.notificationService.showError('Comuniquese al correo soporte@beFocus.com', '¡Error en la platafoma!');
          break;
        }
      }

    });
  }

  consultTypeDocumentTP() {
    this.documentTypeTP = this.cacheTPService.consultTpDictionaries('tipo_documentoCRM');
  }

  assignValuesToControlsOrder(data: any) {
    this.getOrderForm.controls['typeDocument'].setValue(data.getOrderCRMDTO.typeDocument);
    this.getOrderForm.controls['typeDocumentString'].setValue(data.getOrderCRMDTO.typeDocumentString);
    this.getOrderForm.controls['documentNumber'].setValue(data.getOrderCRMDTO.documentNumber);
    this.getOrderForm.controls['distributorCode'].setValue(data.getOrderCRMDTO.distributorCode);
    this.getOrderForm.controls['totalValue'].setValue(data.getOrderCRMDTO.totalValue);
    this.getOrderDetailsForm.controls['orderCode'].setValue(data.getOrderCRMDTO.orderCode);
    this.setOrderFormData('sellerID', data.getOrderCRMDTO.sellerID);
    this.setOrderFormData('sellerName', data.getOrderCRMDTO.sellerName);
  }

  getOrderDetailList(companyCode: string, orderCode: string) {
    this.managerOrdersService.getOrderDetailList(companyCode, orderCode).subscribe(data => {
      switch (data.status.code) {
        case '200': {
          this.notificationService.showSuccess('Consultando el pedido ingresado.', '!Exito!');
          this.assignValuesToControlsOrderDetail(data);
          break;
        }
        case '500': {
          this.notificationService.showError('Comuniquese al correo director.is@befocusgroup.com', '¡Error en la platafoma!');
          break;
        }
      }
    },
      error => {
        if (error.status == 400) {
          this.notificationService.showError('La orden ingresada no registra detalle.', '¡Fallido!');
        }
      }
    );
  }

  assignValuesToControlsOrderDetail(data: any) {
    this.listProducts = data.orderDetailCRMDTOList;
  }

}
