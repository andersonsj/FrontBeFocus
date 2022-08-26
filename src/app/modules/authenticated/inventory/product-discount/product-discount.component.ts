import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentTypeTP } from '@interface/documentTypeTP';
import { ResponseLogin } from '@interface/responseLogin';
import { TableProducts } from '@interface/tableProducts';
import { AuthService } from '@services/auth/auth.service';
import { CacheTPService } from '@services/cache/cache.service';
import { NotificationService } from '@services/notifications/notification.service';
import { ProductService } from '@services/product/product.service';
import { ProductThirdPartyDiscountService } from '@services/productThirdPartyDiscount/product-third-party-discount.service';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit {

  public createProductDiscountForm!: FormGroup;
  public currentUserMemory!: ResponseLogin;
  public documentTypeTP: DocumentTypeTP[] = [];
  public productList!: TableProducts[];

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService, private authService: AuthService,
    private productThirdPartyDiscountService: ProductThirdPartyDiscountService, private cacheTPService: CacheTPService, private productService: ProductService) { }

  ngOnInit(): void {
    this.authService.userCurrent.subscribe(data => {
      this.currentUserMemory = data;
    });
    this.buildCreateProductDiscountForm();
    this.consultTypeDocumentTP();
    this.getProductsByCodeCompany(String(this.currentUserMemory));
  }

  private buildCreateProductDiscountForm() {
    this.createProductDiscountForm = this.formBuilder.group({
      active: new FormControl('true'),
      available_quantity: new FormControl('', Validators.required),
      companyCode: new FormControl(this.currentUserMemory),
      description: new FormControl(''),
      discountPercent: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      effectiveEndDate: new FormControl('', Validators.required),
      effectiveStartDate: new FormControl('', Validators.required),
      id: new FormControl(''),
      productCode: new FormControl('', Validators.required),
      productThirdDiscountSerial: new FormControl(''),
      typeDocument: new FormControl('', Validators.required),
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
    })
  }

  consultTypeDocumentTP() {
    this.documentTypeTP = this.cacheTPService.consultTpDictionaries('tipo_documento');
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
