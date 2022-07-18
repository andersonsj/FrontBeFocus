import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseLogin } from '@interface/responseLogin';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-be-header',
  templateUrl: './be-header.component.html',
  styleUrls: ['./be-header.component.css']
})
export class BeHeaderComponent implements OnInit {

  public currentUserMemory!: ResponseLogin;
  public activateButton: Boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.validationClient();
  }

  validationClient() {

    this.authService.userCurrent.subscribe(data => {

      console.log("validationClient");
      console.log(data.companyCode);

      if (data.companyCode == 0) {
        this.activateButton = false;
      } else {
        this.activateButton = true;
      }

    });
  }

  logout() {
    console.log("logout");
    this.authService.logout();
  }

}
