import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-be-side',
  templateUrl: './be-side.component.html',
  styleUrls: ['./be-side.component.css']
})
export class BeSideComponent implements OnInit {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  public activateButton: Boolean = true;

  visibleSidebar1:any;

  constructor(private authService: AuthService, private router: Router, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.validationClient();
    this.primengConfig.ripple = true;
  }

  validationClient() {

    this.authService.userCurrent.subscribe(data => {
      if (data.companyCode == 0) {
        this.activateButton = false;
      } else {
        this.activateButton = true;
      }

    });
  }

  navegation() {
    this.router.navigate(['/home/authenticated/content-user/content-client']);
  }

  navegationByCreateClient(){
    this.router.navigate(['/home/authenticated/content-user/create-client']);
  }

  navegationBydashboard() {
    this.router.navigate(['/home/authenticated/content-user/dashboard']);
  }

  navegationByManagerOrders() {
    this.router.navigate(['/home/authenticated/content-user/manager-orders']);
  }

  navegationByCreateOrders() {
    this.router.navigate(['/home/authenticated/content-user/create-order']);
  }

  navegationByConsultInventory() {
    this.router.navigate(['/home/authenticated/content-user/consult-inventory']);
  }

  navegationByCreateProductDiscount() {
    this.router.navigate(['/home/authenticated/content-user/create-product-discount']);
  }

}
