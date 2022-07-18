import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResponseLogin } from '@interface/responseLogin';
import { ThirdPartyDTO } from '@interface/thirdPartyDTO';
import { ClientService } from '@services/client/client.service';

@Component({
  selector: 'app-dashboard-item-one',
  templateUrl: './dashboard-item-one.component.html',
  styleUrls: ['./dashboard-item-one.component.css']
})
export class DashboardItemOneComponent implements OnInit {

  public registeredCustomers: number = 0;
  public userCurrent!: ResponseLogin;
  public client: ThirdPartyDTO = { companyCode: 0, documentNumber: '', typeDocument: 0, typeDocumentString: '', names: '', surname: '' };

  public clientList: ThirdPartyDTO[] = [];
  public dataSource = new MatTableDataSource<ThirdPartyDTO>(this.clientList);
  public column: string[] = ['Tipo de documento', 'Numero de documento', 'Nombre'];

  constructor(private authService: AuthService, private router: Router, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.userCurrent.subscribe(userCurrent => {
      this.userCurrent = userCurrent;
      this.getClientsByIdCompany(this.userCurrent);
    });
  }

  getClientsByIdCompany(companyCode: ResponseLogin) {
    this.clientService.getThirdPartyListByCompany(String(companyCode)).subscribe(data => {
      if (data.status.code == 200) {
        if (data.thirdPartyDTOList.length > 0) {
          this.registeredCustomers = data.thirdPartyDTOList.length;

          for (let i = 0; i < data.thirdPartyDTOList.length; i++) {
            if (i < 5) {
              this.clientList.push(data.thirdPartyDTOList[i]);
            } else {
              break;
            }
          }
          this.dataSource.data = this.clientList;

        }
      }
    });
  }

  navegationBydashboard() {
    this.router.navigate(['/home/authenticated/content-user/grid-client']);
  }


}