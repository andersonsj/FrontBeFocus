import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '@services/client/client.service';
import { AuthService } from '@services/auth/auth.service';
import { ThirdPartyDTO } from '@interface/thirdPartyDTO';
import { ResponseLogin } from '@interface/responseLogin';
@Component({
  selector: 'app-grid-client',
  templateUrl: './grid-client.component.html',
  styleUrls: ['./grid-client.component.css']
})

export class GridClientComponent implements OnInit, AfterViewInit {

  constructor(private clientService: ClientService, private authService: AuthService) { }

  public clientList!: ThirdPartyDTO[];
  public column: string[] = ['Tipo de documento', 'Numero de documento', 'Nombre', 'Digito de verificacion'];
  public dataSource = new MatTableDataSource<ThirdPartyDTO>(this.clientList);
  public userCurrent!: ResponseLogin;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Numero de clientes por pagina';
    this.paginator._intl.firstPageLabel = 'Primera pagina';
    this.paginator._intl.lastPageLabel = 'Ultima pagina';
    this.paginator._intl.nextPageLabel = 'Siguiente pagina';
    this.paginator._intl.previousPageLabel = 'Pagina anterior';
    this.dataSource.paginator = this.paginator;

  }


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

}
