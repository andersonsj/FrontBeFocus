import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: 'app-be-side',
  templateUrl: './be-side.component.html',
  styleUrls: ['./be-side.component.css']
})
export class BeSideComponent implements OnInit {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  public activateButton: Boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.validationClient();
  }

  validationClient() {

    this.authService.userCurrent.subscribe(data => {
      console.log("validationClient side");
      console.log(data);
      if (data.companyCode == 0) {
        this.activateButton = false;
        console.log(this.activateButton);
      } else {
        this.activateButton = true;
        console.log(this.activateButton);
      }

    });
  }

  navegation() {
    this.router.navigate(['/home/authenticated/content-user/content-client']);
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


}
