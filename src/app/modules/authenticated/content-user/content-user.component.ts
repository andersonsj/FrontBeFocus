
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-user',
  templateUrl: './content-user.component.html',
  styleUrls: ['./content-user.component.css']
})
export class ContentUserComponent implements OnInit {

  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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
