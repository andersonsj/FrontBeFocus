import { NotificationService } from './../../../../services/notifications/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheTPService } from './../../../../services/cache/cache.service';
import { ClientService } from './../../../../services/client/client.service';
import { Component, OnInit } from '@angular/core';
import { CountryTP } from '@interface/countryTP';
import { DepartmentTP } from '@interface/departmentTP';
import { CityTP } from '@interface/cityTP';
import { AdressTypes } from '@interface/addressTypes';
import { CurrentClient } from '@interface/currentClient';
import { RequestThirdPartyAddressDTO } from '@interface/requestThirdPartyAddressDTO';

@Component({
  selector: 'app-location-data-client',
  templateUrl: './location-data-client.component.html',
  styleUrls: ['./location-data-client.component.css']
})
export class LocationDataClientComponent implements OnInit {

  public createAdressForm!: FormGroup;
  public registeredAddressesForm!: FormGroup;
  public activateRegister: Boolean = false;
  public countries: CountryTP[] = [];
  public departments: DepartmentTP[] = [];
  public cities: CityTP[] = [];
  public addressTypes: AdressTypes[] = [];
  public selectedCountryTP: any;
  public selectedDepartmentTP: any;
  public selectedAddressType: any;
  private currentClient!: CurrentClient;

  public activateButtonUpdate!: Boolean;
  public activateButtonRegister!: Boolean;

  public registeredAddresses: any[] = [];

  constructor(private clientService: ClientService, private cacheTPService: CacheTPService, private formBuilder: FormBuilder,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.clientService.activateRegister.subscribe(
      data => {
        this.activateRegister = data
      }
    );
    this.consultDictionariesTP();
    this.getCurrentClient();

    this.clientService.activateButtonRegister.subscribe(
      data => {
        this.activateButtonRegister = data;
      }
    );

    this.clientService.activateButtonUpdate.subscribe(
      data => {
        this.activateButtonUpdate = data;
      }
    );

  }

  private buildForm() {
    this.createAdressForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: ['', Validators.required],
      typeAddressCode: ['', Validators.required],
      address: [''],
      addressStandar: [''],
      postalCode: [''],
      country_code: [''],
      state_code: [''],
      city_code: ['']
    });

    this.registeredAddressesForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: ['', Validators.required],
      typeAddressCode: ['', Validators.required],
      address: [''],
      addressStandar: [''],
      postalCode: [''],
      country_code: [''],
      state_code: [''],
      city_code: ['']
    });

  }

  consultDictionariesTP() {
    this.addressTypes = this.cacheTPService.consultTpDictionaries('tipo_direccionCRM');
    this.countries = this.cacheTPService.consultTpDictionaries('paisCRM');
  }

  selectedCountryChange() {
    this.departments = this.cacheTPService.consultTpDictionaries('departamentosCRM', this.selectedCountryTP);
  }

  selectedDepartmentChange() {
    this.cities = this.cacheTPService.consultTpDictionaries('ciudadesCRM', this.selectedCountryTP, this.selectedDepartmentTP);
  }

  getCurrentClient() {
    this.clientService.currentClientData.subscribe(
      data => {
        this.currentClient = data;
        this.updateDataForm(data);
        this.getAdress();
      }
    );
  }

  updateDataForm(currentClient: CurrentClient) {
    this.createAdressForm.controls['typeDocument'].setValue(currentClient.typeDocument);
    this.createAdressForm.controls['documentNumber'].setValue(currentClient.documentNumber);
    this.createAdressForm.controls['companyCode'].setValue(currentClient.companyCode);
  }

  createAdress() {
    this.clientService.createAdress(this.createAdressForm.value).subscribe(data => {
      if (data.status.code == 200) {

        switch (data.getThirdPartyAddressDTO.resultDTO.resultCode) {
          case 1: {
            this.notificationService.showSuccess('Se creo la direccion en el sistema', '¡Registro Exitoso!');
            break;
          }
          case 2: {
            this.notificationService.showError(data.getThirdPartyAddressDTO.resultDTO.message, '¡Registro Fallido!');
            break;
          }
        }

        this.getAdress();
      }
    });
  }

  getAdress() {

    let requestThirdPartyAddressDTO: RequestThirdPartyAddressDTO;

    requestThirdPartyAddressDTO = {
      companyCode: this.currentClient.companyCode,
      documentNumber: this.currentClient.documentNumber,
      typeDocument: this.currentClient.typeDocument
    }

    this.clientService.getAdressByClientId(requestThirdPartyAddressDTO).subscribe(data => {
      if (data.status.code == 200) {
        if (data.thirdPartyAddressDTOList.length > 0) {
          this.registeredAddresses = data.thirdPartyAddressDTOList;
        }
      }
    }, error => {
      if (error.status == 403) {
        this.notificationService.showError('Existe un error en el microservicio /api/befocusCrm/getThirdPartyAddressList .', '¡Error de comunicacion!');
      }
    }
    );
  }

}
