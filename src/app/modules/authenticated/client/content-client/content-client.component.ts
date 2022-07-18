import { Component, OnInit } from '@angular/core';
import { ClientService } from '@services/client/client.service';

@Component({
  selector: 'app-content-client',
  templateUrl: './content-client.component.html',
  styleUrls: ['./content-client.component.css']
})
export class ContentClientComponent implements OnInit {

  public activateRegister: Boolean = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {

    this.clientService.activateRegister.subscribe(
      data => {
        this.activateRegister = data
      }
    );

  }

  valueResponse(respuesta:any) {
    alert(respuesta);
   }

}
