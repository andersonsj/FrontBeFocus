import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { ContentClientComponent } from './content-client/content-client.component';
import { ConsultClientComponent } from './consult-client/consult-client.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LocationDataClientComponent } from './location-data-client/location-data-client.component';
import { GridClientComponent } from './grid-client/grid-client.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '@shared/shared/shared.module';
import { CreateClientComponent } from './create-client/create-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import {DialogModule} from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ContentClientComponent,
    ConsultClientComponent,
    RegisterClientComponent,
    LocationDataClientComponent,
    GridClientComponent,
    CreateClientComponent
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    DialogModule,
    InputNumberModule
  ]
})

export class ClientModule { }
