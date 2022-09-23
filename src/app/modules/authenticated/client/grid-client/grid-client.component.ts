import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '@services/client/client.service';
import { AuthService } from '@services/auth/auth.service';
import { ThirdPartyDTO } from '@interface/thirdPartyDTO';
import { ResponseLogin } from '@interface/responseLogin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-grid-client',
  templateUrl: './grid-client.component.html',
  styleUrls: ['./grid-client.component.css']
})

export class GridClientComponent implements OnInit {

  constructor(private clientService: ClientService, private authService: AuthService,  private router: Router) { }

  public clientList!: ThirdPartyDTO[];
  public column: string[] = ['Tipo de documento', 'Numero de documento', 'Nombre', 'Digito de verificacion'];
  public dataSource = new MatTableDataSource<ThirdPartyDTO>(this.clientList);
  public userCurrent!: ResponseLogin;

  public first: number = 0;
  public rows: number = 10;


  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.userCurrent.subscribe(userCurrent => {
      this.userCurrent = userCurrent;
      this.getThirdPartyListByCompany(this.userCurrent);
    });
  }

  getThirdPartyListByCompany(companyCode: ResponseLogin) {
    this.clientService.getThirdPartyListByCompany(String(companyCode)).subscribe(data => {
      if (data.status.code == 200) {
        this.clientList = data.thirdPartyDTOList;
        this.dataSource.data = this.clientList;
      }
    });
  }

  navegation() {
    this.router.navigate(['/home/authenticated/content-user/content-client']);
  }

}
