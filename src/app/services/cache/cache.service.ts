import { GenericTpService } from './../generic-tp/generic-tp.service';
import { Injectable } from '@angular/core';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { GenderTP } from '@interface/genderTP';
import { CivilStatusTP } from '@interface/civilStatusTP';
import { CountryTP } from '@interface/countryTP';
import { DepartmentTP } from '@interface/departmentTP';
import { CityTP } from '@interface/cityTP';
import { AdressTypes } from '@interface/addressTypes';

@Injectable({
  providedIn: 'root'
})
export class CacheTPService {

  private documentTypeTP: DocumentTypeTP[] = [];
  private genderTP: GenderTP[] = [];
  private civilStatusTP: CivilStatusTP[] = [];
  private countryOfBirthTP: CountryTP[] = [];
  private birthDepartment: DepartmentTP[] = [];
  private cityOfBirth: CityTP[] = [];
  public addressTypes: AdressTypes[] = [];
  public selectedCountryTP: any;
  public selectedBirthDepartmentTP: any;

  constructor(private genericTpService: GenericTpService) { }

  public consultTpDictionaries(dictionaryTP: string, selectedCountryTP?: any, selectedBirthDepartmentTP?: any): any {
    this.selectedCountryTP = selectedCountryTP;
    this.selectedBirthDepartmentTP = selectedBirthDepartmentTP;
    return this.cacheExists(dictionaryTP);
  }

  private cacheExists(dictionaryTP: string): any {

    switch (dictionaryTP) {
      case 'tipo_documentoCRM': {
        if (this.documentTypeTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.documentTypeTP;
      }
      case 'generoCRM': {
        if (this.genderTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.genderTP;
      }
      case 'estado_civilCRM': {
        if (this.civilStatusTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.civilStatusTP;
      }
      case 'paisCRM': {
        if (this.countryOfBirthTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.countryOfBirthTP;
      }
      case 'departamentosCRM': {
        if (this.birthDepartment.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.birthDepartment;
      }
      case 'ciudadesCRM': {
        if (this.cityOfBirth.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.cityOfBirth;
      }
      case 'tipo_direccionCRM': {
        if (this.addressTypes.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.addressTypes;

      }
    }
  }

  private useServiceForconsultTpDictionaries(dictionaryTP: string) {
    this.genericTpService.consultdictionaryTP(dictionaryTP, this.selectedCountryTP, this.selectedBirthDepartmentTP).subscribe(data => {
      if (data.status.code == 200) {
        if (data.catalogsCRM.length > 0) {
          this.filterData(data, dictionaryTP);
        }
      }
    });

  }

  /**Metodo que filtra la data obtenida de la tabla typo de documento tp, permitiendo sacar los tipos en una variable, para presentar en html*/
  private filterData(data: any, dictionaryTP: string) {

    let countryTp: CountryTP;
    let departmentTP: DepartmentTP;
    let documentTypeTP: DocumentTypeTP;
    let cityTP: CityTP;
    let genderTP: GenderTP;
    let adressTypes: AdressTypes;
    let civilStatusTP: CivilStatusTP;

    for (let i = 0; i < data.catalogsCRM.length; i++) {

      let elementDictionary: any = data.catalogsCRM[i];

      if (dictionaryTP == 'tipo_documentoCRM') {
        documentTypeTP = { documentTypeTPId: elementDictionary.parameter1, description: elementDictionary.parameter3 };
        this.documentTypeTP.push(documentTypeTP);
      }

      if (dictionaryTP == 'generoCRM') {
        genderTP = { description: elementDictionary.parameter3, genderTPId: elementDictionary.parameter1 };
        this.genderTP.push(genderTP);
      }

      if (dictionaryTP == 'estado_civilCRM') {
        civilStatusTP = { civilStatusTPId: elementDictionary.parameter1, civilStatusTPDescription: elementDictionary.parameter3 };
        this.civilStatusTP.push(civilStatusTP);
      }

      if (dictionaryTP == 'paisCRM') {
        countryTp = { abbreviation: elementDictionary.parameter1, description: elementDictionary.parameter3 };
        this.countryOfBirthTP.push(countryTp);
      }

      if (dictionaryTP == 'departamentosCRM') {
        departmentTP = { abbreviation: elementDictionary.parameter5, description: elementDictionary.parameter4, departmentTPId: elementDictionary.parameter3 };
        this.birthDepartment.push(departmentTP);
      }

      if (dictionaryTP == 'ciudadesCRM') {
        cityTP = { cityTPId: elementDictionary.parameter4, description: elementDictionary.parameter5 };
        this.cityOfBirth.push(cityTP);
      }

      if (dictionaryTP == 'tipo_direccionCRM') {
        adressTypes = { adressTypesId: elementDictionary.parameter1, description: elementDictionary.parameter3 };
        this.addressTypes.push(adressTypes);
      }

    }
  }

}
