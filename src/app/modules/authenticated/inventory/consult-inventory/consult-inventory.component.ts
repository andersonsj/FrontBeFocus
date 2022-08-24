import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from '@interface/responseLogin';
import { TableProducts } from '@interface/tableProducts';
import { AuthService } from '@services/auth/auth.service';
import { ProductService } from '@services/product/product.service';

@Component({
  selector: 'app-consult-inventory',
  templateUrl: './consult-inventory.component.html',
  styleUrls: ['./consult-inventory.component.css']
})
export class ConsultInventoryComponent implements OnInit {

  public productList!: TableProducts[];
  private currentClient!: ResponseLogin;

  public first: number = 0;
  public rows: number = 10;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userCurrent.subscribe(data => {
      this.currentClient = data;
      this.getProductsByCodeCompany(String(data));
    });
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
