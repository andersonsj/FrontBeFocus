export interface CurrentClient {
    
    typeDocument: Number;
    documentNumber: String; 
    companyCode: Number;
    verificationDigitNit?: Number;
    documentIssueDate?: String;
    legalPerson?: Boolean;
    names?: String;
    surname?: String;
    secondSurname?: String;
    fullNameBusinessName?: String;
    genderCode?: Number;
    birthDate?: String;
    relatioshipStatusCode?: String;
    professionJob?: String;
    countryOfBirthCode?: Number;
    birthDepartmentCode?: Number;
    birthDepartmentString?: string;
    cityMunicipalityCode?: Number;
    weight?: String;
    height?: String;
    bloodType?: String;
    typeDocumentString?: String;
    thirdPartyTypeCode?: String;

}