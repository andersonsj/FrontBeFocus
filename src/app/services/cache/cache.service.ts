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
      case 'tipo_documento': {
        if (this.documentTypeTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.documentTypeTP;
      }
      case 'genero': {
        if (this.genderTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.genderTP;
      }
      case 'estado_civil': {
        if (this.civilStatusTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.civilStatusTP;
      }
      case 'pais': {
        if (this.countryOfBirthTP.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.countryOfBirthTP;
      }
      case 'departamentos': {
        if (this.birthDepartment.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.birthDepartment;
      }
      case 'ciudades': {
        if (this.cityOfBirth.length == 0) {
          this.useServiceForconsultTpDictionaries(dictionaryTP);
        }
        return this.cityOfBirth;
      }
      case 'tipo_direccion': {
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
        if (data.catalogs.length > 0) {
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

    for (let i = 0; i < data.catalogs.length; i++) {
      if (dictionaryTP == 'tipo_documento') {
        documentTypeTP = { documentTypeTPId: data.catalogs[i].field1, description: data.catalogs[i].field3 };
        this.documentTypeTP.push(documentTypeTP);
      }

      if (dictionaryTP == 'genero') {
        genderTP = { description: data.catalogs[i].field3, genderTPId: data.catalogs[i].field1 };
        this.genderTP.push(genderTP);
      }

      if (dictionaryTP == 'estado_civil') {
        civilStatusTP = {civilStatusTPId: data.catalogs[i].field1, civilStatusTPDescription: data.catalogs[i].field3};
        this.civilStatusTP.push(civilStatusTP);
      }

      if (dictionaryTP == 'pais') {
        countryTp = { abbreviation: data.catalogs[i].field1, description: data.catalogs[i].field3 };
        this.countryOfBirthTP.push(countryTp);
      }

      if (dictionaryTP == 'departamentos') {
        departmentTP = { abbreviation: data.catalogs[i].field5, description: data.catalogs[i].field4, departmentTPId: data.catalogs[i].field3 };
        this.birthDepartment.push(departmentTP);
      }

      if (dictionaryTP == 'ciudades') {
        cityTP = { cityTPId: data.catalogs[i].field4, description: data.catalogs[i].field5 };
        this.cityOfBirth.push(cityTP);
      }

      if (dictionaryTP == 'tipo_direccion') {
        adressTypes={adressTypesId: data.catalogs[i].field1, description: data.catalogs[i].field3};
        this.addressTypes.push(adressTypes);
      }

    }
  }

}
