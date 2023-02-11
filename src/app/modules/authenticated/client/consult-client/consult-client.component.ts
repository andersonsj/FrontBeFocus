import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { CacheTPService } from '@services/cache/cache.service';
import { ClientService } from '@services/client/client.service';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { ResponseLogin } from '@interface/responseLogin';

@Component({
  selector: 'app-consult-client',
  templateUrl: './consult-client.component.html',
  styleUrls: ['./consult-client.component.css']
})
export class ConsultClientComponent implements OnInit {

  public documentTypeTP: DocumentTypeTP[] = [];
  public getClientForm!: FormGroup;
  public currentUserMemory!: ResponseLogin;

  constructor(
    private cacheTPService: CacheTPService, private formBuilder: FormBuilder, 
    private clientService: ClientService, private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.consultTypeDocumentTP();

    this.authService.userCurrent.subscribe(data=>{
      this.currentUserMemory = data;
    });

  }

  private buildForm() {
    this.getClientForm = this.formBuilder.group({
      typeDocument: ['', Validators.required],
      documentNumber: ['', Validators.required],
      companyCode: ['']
    });
  }

  getDataClientForm(nameControl: string):any {
    return this.getClientForm.controls[nameControl].value;
  }

  consultTypeDocumentTP() {
    console.log('consultTypeDocumentTP');
    this.documentTypeTP = this.cacheTPService.consultTpDictionaries('tipo_documentoCRM');
    console.log(this.documentTypeTP);
  }

  getClient() {
    let value : any = this.getDataClientForm('typeDocument');
    this.getClientForm.controls['companyCode'].setValue(this.currentUserMemory);
    this.getClientForm.controls['typeDocument'].setValue(parseInt(value));
    this.clientService.getClient(this.getClientForm.value, false).subscribe();
    this.clientService.getClient(this.getClientForm.value, false).subscribe();
  }

}
