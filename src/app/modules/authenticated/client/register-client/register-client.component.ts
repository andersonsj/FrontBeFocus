import { NotificationService } from './../../../../services/notifications/notification.service';
import { ClientService } from './../../../../services/client/client.service';
import { CacheTPService } from './../../../../services/cache/cache.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenderTP } from '@interface/genderTP';
import { CivilStatusTP } from '@interface/civilStatusTP';
import { CountryTP } from '@interface/countryTP';
import { DepartmentTP } from '@interface/departmentTP';
import { CityTP } from '@interface/cityTP';
import { CurrentClient } from '@interface/currentClient';
import { ProductService } from '@services/product/product.service';
import { TableProducts } from '@interface/tableProducts';
import { ProductThirdPartyDiscountService } from '@services/productThirdPartyDiscount/product-third-party-discount.service';


@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  public genderTP: GenderTP[] = [];
  public civilStatusTPList: CivilStatusTP[] = [];
  public countryOfBirthTP: CountryTP[] = [];
  public birthDepartment: DepartmentTP[] = [];
  public cityOfBirth: CityTP[] = [];
  public selectedCountryTP: any;
  public selectedBirthDepartmentTP: any;
  public registerForm!: FormGroup;
  private currentClient!: CurrentClient;
  public activateButtonUpdate!: Boolean;
  public activateButtonRegister!: Boolean;

  displayModal!: boolean;

  public productList!: TableProducts[];
  public createProductDiscountForm!: FormGroup;

  constructor(private cacheTPService: CacheTPService, private formBuilder: FormBuilder, private clientService: ClientService,
    private notificationService: NotificationService, private productService: ProductService,
    private productThirdPartyDiscountService: ProductThirdPartyDiscountService) { }

  ngOnInit(): void {
    this.buildForm();
    this.consultDictionariesTP();
    this.buildCreateProductDiscountForm();


    this.clientService.currentClientData.subscribe(
      data => {
        this.currentClient = data;
        this.updateDataForm(data);

      }
    );

    this.clientService.activateButtonRegister.subscribe(
      data => {
        this.activateButtonRegister = data
      }
    );

    this.clientService.activateButtonUpdate.subscribe(
      data => {
        this.activateButtonUpdate = data
      }
    );

  }

  consultDictionariesTP() {
    this.genderTP = this.cacheTPService.consultTpDictionaries('generoCRM');
    this.civilStatusTPList = this.cacheTPService.consultTpDictionaries('estado_civilCRM');
    this.countryOfBirthTP = this.cacheTPService.consultTpDictionaries('paisCRM');
  }

  selectedCountryChange() {
    this.birthDepartment = this.cacheTPService.consultTpDictionaries('departamentosCRM', this.selectedCountryTP);
  }

  selectedBirthDepartmentChange() {
    this.cityOfBirth = this.cacheTPService.consultTpDictionaries('ciudadesCRM', this.selectedCountryTP, this.selectedBirthDepartmentTP);
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: ['', Validators.required],
      verificationDigitNit: [''],
      documentIssueDate: [""],
      legalPerson: [""],
      names: [""],
      surname: [""],
      secondSurname: [""],
      fullNameBusinessName: [""],
      genderCode: [""],
      birthDate: [""],
      relatioshipStatusCode: [""],
      professionJob: [""],
      countryOfBirthCode: [""],
      birthDepartmentCode: [""],
      cityMunicipalityCode: [""],
      weight: [""],
      height: [""],
      bloodType: [""],
      typeDocumentString: [""],
      thirdPartyTypeCode: [""]
    });
  }

  getDataRegisterForm(nameControl: string) {

    let controlValue: any;

    if (this.registerForm.controls[nameControl].value != undefined) {
      controlValue = this.registerForm.controls[nameControl].value;
    } else {
      controlValue = ' ';
    }

    return controlValue;
  }

  setDataRegisterForm(nameControl: string, valueControl: any) {
    this.registerForm.controls[nameControl].setValue(valueControl);
  }

  private buildCreateProductDiscountForm() {
    this.createProductDiscountForm = this.formBuilder.group({
      active: new FormControl('true'),
      available_quantity: new FormControl(''),
      companyCode: new FormControl(''),
      description: new FormControl(''),
      discountPercent: new FormControl('', Validators.required),
      documentNumber: new FormControl(''),
      effectiveEndDate: new FormControl(''),
      effectiveStartDate: new FormControl(''),
      id: new FormControl(''),
      productCode: new FormControl('', Validators.required),
      productThirdDiscountSerial: new FormControl(''),
      typeDocument: new FormControl(''),
    });
  }

  setDataCreateProductDiscountForm(nameControl: string, valueControl: any) {
    this.createProductDiscountForm.controls[nameControl].setValue(valueControl);
  }

  getCreateProductDiscountForm(nameControl: string) {
    return this.createProductDiscountForm.controls[nameControl].value;;
  }

  createProductDiscount() {

    this.productThirdPartyDiscountService.createProductThirdPartyDiscountByThirdParty(this.createProductDiscountForm.value).subscribe(data => {
      console.log(data);

      if (data.status.code == "200") {
        this.notificationService.showSuccess('Se registro un descuento de ' + this.getCreateProductDiscountForm('discountPercent') + '%', '¡Descuento asigando!');
        this.displayModal = false;
      } else {
        this.notificationService.showError('', '¡Registro Fallido!');
      }

    })
  }


  assignValuesAndCreateDiscount() {
    this.setDataCreateProductDiscountForm('companyCode', this.currentClient.companyCode);
    this.setDataCreateProductDiscountForm('typeDocument', this.getDataRegisterForm('typeDocument'));
    this.setDataCreateProductDiscountForm('documentNumber', this.getDataRegisterForm('documentNumber'));
    this.createProductDiscount();
  }

  updateDataForm(currentClient: CurrentClient) {

    this.setDataRegisterForm('typeDocument', currentClient.typeDocument);
    this.setDataRegisterForm('documentNumber', currentClient.documentNumber);
    this.setDataRegisterForm('companyCode', currentClient.companyCode);
    this.setDataRegisterForm('verificationDigitNit', currentClient.verificationDigitNit);
    this.setDataRegisterForm('documentIssueDate', currentClient.documentIssueDate);
    this.setDataRegisterForm('legalPerson', currentClient.legalPerson);
    this.setDataRegisterForm('names', currentClient.names);
    this.setDataRegisterForm('surname', currentClient.surname);
    this.setDataRegisterForm('secondSurname', currentClient.secondSurname);
    this.setDataRegisterForm('fullNameBusinessName', currentClient.fullNameBusinessName);
    this.setDataRegisterForm('typeDocument', currentClient.typeDocument);
    this.setDataRegisterForm('genderCode', currentClient.genderCode);
    this.setDataRegisterForm('birthDate', currentClient.birthDate);
    this.setDataRegisterForm('relatioshipStatusCode', currentClient.relatioshipStatusCode);
    this.setDataRegisterForm('professionJob', currentClient.professionJob);
    this.setDataRegisterForm('countryOfBirthCode', currentClient.countryOfBirthCode);
    this.setDataRegisterForm('birthDepartmentCode', currentClient.birthDepartmentString);
    this.setDataRegisterForm('cityMunicipalityCode', currentClient.cityMunicipalityCode);
    this.setDataRegisterForm('weight', currentClient.weight);
    this.setDataRegisterForm('height', currentClient.height);
    this.setDataRegisterForm('bloodType', currentClient.bloodType);
    this.setDataRegisterForm('typeDocumentString', currentClient.typeDocumentString);
    this.setDataRegisterForm('thirdPartyTypeCode', currentClient.thirdPartyTypeCode);

  }

  updateClient() {
    this.clientService.updateClient(this.registerForm.value).subscribe(data => {

      switch (data.getThirdPartyDTO.resultDTO.resultCode) {
        case 1: {
          this.notificationService.showSuccess('Cliente Actualizado', '¡Registro Exitoso!');
          break;
        }

        case 2: {
          this.notificationService.showError(data.getThirdPartyDTO.resultDTO.message, '¡Registro Fallido!');
          break;
        }

      }

    });
  }

  showDialog() {
    this.displayModal = true;
    this.getProductsByCodeCompany(String(this.currentClient.companyCode));
  }

  getProductsByCodeCompany(companyCode: string) {
    this.productService.getProductsByCodeCompany(companyCode).subscribe(data => {
      switch (data.status.code) {
        case '200': {
          this.productList = data.productDTOList;
          break;
        }
      }
    });
  }



}
