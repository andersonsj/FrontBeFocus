export interface RequestThirdPartyDTO {
    typeDocument: number;
    documentNumber: string;
    companyCode: number;
    verificationDigitNit?: number;
    documentIssueDate?: string;
    legalPerson?: boolean;   
}