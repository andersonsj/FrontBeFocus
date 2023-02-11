import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressTypes } from '@interface/addressTypes';
import { CityTP } from '@interface/cityTP';
import { CivilStatusTP } from '@interface/civilStatusTP';
import { CountryTP } from '@interface/countryTP';
import { CurrentClient } from '@interface/currentClient';
import { DepartmentTP } from '@interface/departmentTP';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { GenderTP } from '@interface/genderTP';
import { ResponseLogin } from '@interface/responseLogin';
import { ResponseThirdPartyType } from '@interface/responseThirdPartyType';
import { AuthService } from '@services/auth/auth.service';
import { CacheTPService } from '@services/cache/cache.service';
import { ClientService } from '@services/client/client.service';
import { NotificationService } from '@services/notifications/notification.service';
import { ThirdPartyTypeService } from '@services/thirdPartyType/third-party-type.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public genderTP: GenderTP[] = [];
  public civilStatusTPList: CivilStatusTP[] = [];
  public countryOfBirthTP: CountryTP[] = [];
  public birthDepartment: DepartmentTP[] = [];
  public cityOfBirth: CityTP[] = [];
  public selectedCountryTP: any;
  public selectedCountryTPLocalizacion: any;
  public selectedBirthDepartmentTP: any;
  public selectedBirthDepartmentTPLocalizacion: any
  public registerForm!: FormGroup;
  private currentClient!: CurrentClient;
  public documentTypeTP: DocumentTypeTP[] = [];
  public thirdPartyTypeList: ResponseThirdPartyType[] = [];
  public currentUserMemory!: ResponseLogin;
  public createAdressForm!: FormGroup;
  public selectedAddressType: any;
  public addressTypes: AdressTypes[] = [];

  constructor(private cacheTPService: CacheTPService, private formBuilder: FormBuilder, private clientService: ClientService,
    private notificationService: NotificationService, private authService: AuthService, private thirdPartyTypeService: ThirdPartyTypeService) { }

  ngOnInit(): void {
    this.buildForm();
    this.consultDictionariesTP();
    this.consultTypeDocumentTP();

    let list: any[];
    let responseThirdPartyType: ResponseThirdPartyType;

    this.authService.userCurrent.subscribe(data => {
      this.currentUserMemory = data;
      this.thirdPartyTypeService.getAllThirdPartyType(String(data)).subscribe(
        thirdPartyType => {

          switch (thirdPartyType.status.code) {
            case "200": {
              list = thirdPartyType.listThirdPartyTypeDTO;
              list.forEach(iter => {
                responseThirdPartyType = {
                  thirdPartyTypeCode: iter.thirdPartyTypeCode,
                  thirdPartyTypeDescription: iter.thirdPartyTypeDescription,
                  thirdPartyTypeShort: iter.thirdPartyTypeShort
                };

                this.thirdPartyTypeList.push(responseThirdPartyType);
              });


              break;
            }
          }
        }

      );
    });

  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: [''],
      verificationDigitNit: [''],
      documentIssueDate: [""],
      legalPerson: [""],
      names: ['', Validators.required],
      surname: ['', Validators.required],
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
      thirdPartyTypeCode: ['', Validators.required],
      active: [""]
    });

    this.createAdressForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: [''],
      typeAddressCode: ['', Validators.required],
      address: ['', Validators.required],
      addressStandar: [''],
      postal_code: [''],
      country_code: ['', Validators.required],
      state_code: [''],
      city_code: ['', Validators.required],
      neighborhood: ['']
    });

  }


  consultDictionariesTP() {
    this.genderTP = this.cacheTPService.consultTpDictionaries('generoCRM');
    this.civilStatusTPList = this.cacheTPService.consultTpDictionaries('estado_civilCRM');
    this.countryOfBirthTP = this.cacheTPService.consultTpDictionaries('paisCRM');
    this.addressTypes = this.cacheTPService.consultTpDictionaries('tipo_direccionCRM');
  }

  selectedCountryChange(selectedCountryTP: any) {
    this.birthDepartment = this.cacheTPService.consultTpDictionaries('departamentosCRM', selectedCountryTP);
  }

  selectedBirthDepartmentChange() {
    this.cityOfBirth = this.cacheTPService.consultTpDictionaries('ciudadesCRM', this.selectedCountryTP, this.selectedBirthDepartmentTP);
  }

  setDataRegisterForm(nameControl: string, valueControl: any) {
    this.registerForm.controls[nameControl].setValue(valueControl);
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

  getTouchedControlCreateAdressForm(nameControl: string) {
    return this.createAdressForm.controls[nameControl].touched;
  }

  getStatusControlCreateAdressForm(nameControl: string) {
    return this.createAdressForm.controls[nameControl].errors;
  }

  getStatusCreateAdressForm() {
    return this.createAdressForm.valid;
  }

  getTouchedControlRegisterForm(nameControl: string) {
    return this.registerForm.controls[nameControl].touched;
  }

  getStatusControlRegisterForm(nameControl: string) {
    return this.registerForm.controls[nameControl].errors;
  }

  getStatusRegisterForm() {
    return this.registerForm.valid;
  }

  setDataAdressForm(nameControl: string, valueControl: any) {
    this.createAdressForm.controls[nameControl].setValue(valueControl);
  }

  createClient() {

    this.setDataRegisterForm('active', true);
    this.setDataRegisterForm('companyCode', this.currentUserMemory);
    this.setDataRegisterForm('fullNameBusinessName', this.getDataRegisterForm('names') + ' ' + this.getDataRegisterForm('surname') + ' ' + this.getDataRegisterForm('secondSurname'));

    this.clientService.createClient(this.registerForm.value).subscribe(data => {

      switch (data.getThirdPartyDTO.resultDTO.resultCode) {
        case 1: {
          this.notificationService.showSuccess('Cliente almacenado', '¡Registro Exitoso!');
          this.createAdress();
          this.registerForm.reset();
          break;
        }

        case 2: {
          this.notificationService.showError(data.getThirdPartyDTO.resultDTO.message, '¡Registro Fallido!');
          break;
        }

      }

    });
  }

  consultTypeDocumentTP() {
    this.documentTypeTP = this.cacheTPService.consultTpDictionaries('tipo_documentoCRM');
  }


  createAdress() {

    this.setDataAdressForm('typeDocument', this.getDataRegisterForm('typeDocument'));
    this.setDataAdressForm('documentNumber', this.getDataRegisterForm('documentNumber'));
    this.setDataAdressForm('companyCode', this.getDataRegisterForm('companyCode'));

    this.clientService.createAdress(this.createAdressForm.value).subscribe(data => {
      if (data.status.code == 200) {

        switch (data.getThirdPartyAddressDTO.resultDTO.resultCode) {
          case 1: {
            this.createAdressForm.reset();
            this.notificationService.showSuccess('Se creo la direccion en el sistema', '¡Registro Exitoso!');
            break;
          }
          case 2: {
            this.notificationService.showError(data.getThirdPartyAddressDTO.resultDTO.message, '¡Registro Fallido!');
            break;
          }
        }
      }
    });
  }

}
