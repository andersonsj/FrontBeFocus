import { StageProcessCRMService } from './../../../../services/stageProcessCRM/stage-process-crm.service';
import { DistributorService } from './../../../../services/distributor/distributor.service';
import { ClientService } from './../../../../services/client/client.service';
import { SellerService } from './../../../../services/seller/seller.service';
import { NotificationService } from './../../../../services/notifications/notification.service';
import { ProductService } from './../../../../services/product/product.service';
import { ManagerOrdersService } from './../../../../services/order/manager-orders.service';
import { AuthService } from 'app/services/auth/auth.service';
import { CacheTPService } from './../../../../services/cache/cache.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { ThirdPartyDTO } from '@interface/thirdPartyDTO';
import { ResponseLogin } from '@interface/responseLogin';
import { CurrentClient } from '@interface/currentClient';
import { StageProcessCRM } from '@interface/stageProcessCRM';
import { OrderDetailCRMDTO } from '@interface/orderDetailCRMDTO';
import { RequestOrderCRMDTO } from '@interface/requestOrderCRMDTO';
import { RequestGetClient } from '@interface/requestGetClient';
import { ProductThirdPartyDiscountService } from '@services/productThirdPartyDiscount/product-third-party-discount.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  public orderForm!: FormGroup;
  public orderDetailsForm!: FormGroup;
  public documentTypeTP: DocumentTypeTP[] = [];
  public distributorList: ThirdPartyDTO[] = [];
  private currentClient!: ResponseLogin;
  public products: any[] = [];
  public selectedProduct: any;
  public descriptionProduct: string = '';
  public unitsAvailable: number = 0;
  public sellersList: any[] = [];
  public selectedSeller: any;
  public nameSellerSelected: string = '';
  public totalProducts: any[] = new Array();
  public orderDetailsFormList: any[] = [];
  public currentClientMemory!: CurrentClient;
  public nameClient: any;
  public typeDescriptionDistributor: string = '';
  public totalOrder: number = 0;
  public form!: FormGroup;
  public numberOrder!: number;
  public orderDetailsFormAll!: FormGroup;
  public stageProcessCRM: StageProcessCRM[] = [];

  public activateButtonAdd: Boolean = true;

  constructor(private formBuilder: FormBuilder, private cacheTPService: CacheTPService, private authService: AuthService,
    private managerOrdersService: ManagerOrdersService, private productService: ProductService,
    private notificationService: NotificationService, private sellerService: SellerService, private clientService: ClientService,
    private distributorService: DistributorService, private stageProcessCRMService: StageProcessCRMService,
    private productThirdPartyDiscountService: ProductThirdPartyDiscountService) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildFormnew();
    this.buildOrderDetailsFormAll();
    this.consultTypeDocumentTP();


    this.authService.userCurrent.subscribe(data => {
      this.currentClient = data;
      this.orderForm.controls['companyCode'].setValue(data);
      this.getProductsByCodeCompany(String(data));
      this.getSellerCRMListByCompany(String(data));
      this.getListDistributor(String(data));
      this.getListStageProcessCRM(String(data), "1");
    });

  }

  private buildFormnew() {
    this.form = this.formBuilder.group({
      published: true,
      productsAll: this.formBuilder.array([]),
    });
  }

  private buildOrderDetailsFormAll() {
    this.orderDetailsFormAll = this.formBuilder.group({
      orderCode: ['', Validators.required],
      companyCode: ['', Validators.required],
      productCode: ['', Validators.required],
      quantity: [''],
      price: new FormControl(''),
      total: new FormControl(''),
      discountPercent: new FormControl('')
    });
  }

  get pro() {
    return this.form.controls["productsAll"] as FormArray;
  }

  getStatusOrderForm(nameControl: string) {
    return this.orderForm.controls[nameControl].errors;
  }

  addPro() {
    const newProduct = this.formBuilder.group({
      orderCode: ['', Validators.required],
      companyCode: ['', Validators.required],
      productCode: ['', Validators.required],
      unitsAvailable: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      total: new FormControl(''),
      discountPercent: new FormControl('')
    });
    this.pro.push(newProduct);
  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      companyCode: ['', Validators.required],
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      distributorCode: ['', Validators.required],
      totalValue: [''],
      productCode: ['', Validators.required],
      quantity: [''],
      price: [''],
      total: [''],
      lastStageCode: new FormControl('', Validators.required),
      lastProcessCode: new FormControl('', Validators.required),
      sellerID: new FormControl('', Validators.required)
    });

  }


  consultTypeDocumentTP() {
    this.documentTypeTP = this.cacheTPService.consultTpDictionaries('tipo_documento');
  }

  createOrder() {

    this.managerOrdersService.crateOrder(this.generateRequestCreateOrder()).subscribe(data => {
      switch (data.status.code) {
        case '200': {
          switch (data.getOrderCRMDTO.resultDTO.resultCode) {
            case 1: {
              this.notificationService.showSuccess(data.getOrderCRMDTO.orderCode, 'Orden Creada');
              for (let i = 0; i <= this.pro.controls.length - 1; i++) {

                console.log("console.log(this.pro);");
                console.log(this.pro);

                let orderDetailCRMDTO: OrderDetailCRMDTO;
                orderDetailCRMDTO = {
                  companyCode: this.orderForm.controls['companyCode'].value,
                  productCode: this.pro.controls[i].get('productCode')?.value,
                  orderCode: data.getOrderCRMDTO.orderCode,
                  quantity: this.pro.controls[i].get('quantity')?.value,
                  price: this.pro.controls[i].get('price')?.value,
                  total: this.pro.controls[i].get('quantity')?.value * this.pro.controls[i].get('price')?.value,
                  discountPercent: this.pro.controls[i].get('discountPercent')?.value
                }

                this.createDetailOrder(orderDetailCRMDTO);
              }
              this.numberOrder = data.getOrderCRMDTO.orderCode;
              break;
            }

            case 2: {
              this.notificationService.showError('Comuniquese al correo director.is@befocusgroup.com', '¡Error creando la orden!');
              break;
            }
          }
          break;
        }
      }
    });
  }

  generateRequestCreateOrder(): RequestOrderCRMDTO {
    let request: RequestOrderCRMDTO;
    request = {
      companyCode: this.orderForm.controls['companyCode'].value,
      distributorCode: this.orderForm.controls['distributorCode'].value,
      documentNumber: this.orderForm.controls['documentNumber'].value,
      totalValue: this.orderForm.controls['totalValue'].value,
      typeDocument: this.orderForm.controls['typeDocument'].value,
      lastStageCode: this.orderForm.controls['lastStageCode'].value,
      lastProcessCode: 1,
      sellerID: this.orderForm.controls['sellerID'].value
    }
    return request;
  }

  getProductsByCodeCompany(companyCode: string) {
    this.productService.getProductsByCodeCompany(companyCode).subscribe(data => {
      switch (data.status.code) {
        case '200': {
          this.products = data.productDTOList;
          break;
        }
      }
    });
  }

  assignSelectedProductDescription() {

    this.products.forEach(
      product => {
        if (product.productCode == this.selectedProduct) {
          this.descriptionProduct = product.name;
          this.unitsAvailable = product.available_quantity
        }
      }
    );
  }

  calculateTotal(index: number) {
    this.pro.controls[index].get('companyCode')?.setValue(this.currentClient);
    this.products.forEach(
      product => {
        if (this.pro.controls[index].get('productCode')?.value == product.productCode) {
          this.pro.controls[index].get('unitsAvailable')?.setValue(product.available_quantity);
        }
      }
    );
  }

  /**Consulta el descuento de un producto*/
  getDiscountForProduct(index: number) {

    this.productThirdPartyDiscountService.getDiscountForProductByCompanyCodeAndDocumentNumberAndProductCodeAndTypeDocument(
      this.orderForm.get('companyCode')?.value,
      this.orderForm.get('documentNumber')?.value,
      this.pro.controls[index].get('productCode')?.value,
      this.orderForm.get('typeDocument')?.value
    ).subscribe(data => {

      console.log("getDiscountForProduct");
      console.log(data);

      switch (data.status.code) {

        case '200': {

          switch (data.getProductThirdPartyDiscountDTO.resultDTO.resultCode) {
            case 1: {
              this.pro.controls[index].get('discountPercent')?.setValue(data.getProductThirdPartyDiscountDTO.discountPercent);

              console.log(this.form);

              this.notificationService.showInfo("El cliente tiene asociado un porcentaje en el producto ",
                "Porcentaje de descuento encontrado");
              break;
            }
            case 2: {
              this.pro.controls[index].get('discountPercent')?.setValue(0);
              this.notificationService.showInfo("El cliente no tiene asociado un porcentaje en el producto ",
                "Porcentaje de descuento no encontrado");
              break;
            }
          }

          break;
        }
      }
    });

  }

  getSellerCRMListByCompany(companyCode: string) {
    this.sellerService.getSellerCRMListByCompany(companyCode).subscribe(
      data => {
        switch (data.status.code) {
          case '200': {
            this.sellersList = data.sellerCRMDTOList;
            break;
          }
        }
      }
    );
  }

  assignSelectedSellerName() {

    this.sellersList.forEach(seller => {
      if (seller.identification == this.selectedSeller) {
        this.nameSellerSelected = seller.first_name + ' ' + seller.last_name;
        this.orderForm.controls['sellerID'].setValue(seller.id);
      }
    });
  }

  addProductDetail() {
    this.orderDetailsFormList.push(this.orderDetailsFormAll);
  }

  onChangeProductCode(country: any) {
    console.log(country);
    console.log(country.target.value);
  }

  getClient() {

    let requestGetClient: RequestGetClient;
    requestGetClient = {
      typeDocument: this.orderForm.get('typeDocument')?.value,
      documentNumber: this.orderForm.get('documentNumber')?.value,
      companyCode: this.orderForm.get('companyCode')?.value
    }

    this.clientService.getClient(requestGetClient, true).subscribe(data => {
      this.activateButtonAdd = false;
    });

    this.clientService.currentClientData.subscribe(data => {
      this.currentClientMemory = data;
      this.nameClient = this.currentClientMemory.names + ' ' + this.currentClientMemory.surname + ' ' + this.currentClientMemory.secondSurname
    });

  }

  createDetailOrder(orderDetailCRMDTO: OrderDetailCRMDTO) {

    this.managerOrdersService.crateDetailOrder(orderDetailCRMDTO).subscribe(
      detailOrder => {
        switch (detailOrder.status.code) {
          case '200': {
            switch (detailOrder.getOrderDetailCRMDTO.resultDTO.resultCode) {
              case 1: {
                this.notificationService.showSuccess(detailOrder.getOrderDetailCRMDTO.orderCode, 'Se crea detalle para la orden');
                break;
              }

              case 2: {
                this.notificationService.showError('Comuniquese al correo soporte@beFocus.com', '¡Error creando, detalle de la orden!');
                break;
              }

            }
            break;
          }
        }
      }
    );

  }


  private getListDistributor(companyCode: string) {
    this.distributorService.getListDistributor(companyCode).subscribe(data => {

      switch (data.status.code) {

        case '200': {

          if (data.thirdPartyDTOList.length > 0) {
            this.distributorList = data.thirdPartyDTOList;
          }

          break;
        }

      }
    });
  }

  getTypeDescriptionDistributor() {
    this.distributorList.forEach(data => {
      if (data.documentNumber == this.orderForm.get('distributorCode')?.value) {
        this.typeDescriptionDistributor = data.typeDocumentString;
      }

    })
  }

  calculateTotalOrder() {
    this.totalOrder = 0;

    this.pro.controls.forEach(control => {
      this.totalOrder = this.totalOrder + (control.get('price')?.value * control.get('quantity')?.value);
    });

    this.orderForm.get('totalValue')?.setValue(this.totalOrder);

  }

  getListStageProcessCRM(companyCode: string, processCode: string) {
    this.stageProcessCRMService.getListStageProcessCRM(companyCode, processCode).subscribe(data => {
      this.stageProcessCRM = data.getListStageProcessCRMDTO.stageProcessCRMList;
    });
  }

  /**Permite activar o desactivar el boton de guardar orden en funcion de los datos diligenciados */
  activateButtonSaveOrder(): Boolean {

    let disableButtonSaveOrder: Boolean = true;

    if (!this.activateButtonAdd) {
      this.pro.controls.forEach(control => {
        if (control.get('total')?.value != null && control.get('price')?.value != '') {
          disableButtonSaveOrder = false;
        }else{
          disableButtonSaveOrder = true;
        }
      });
    }

    return disableButtonSaveOrder;
  }


}
