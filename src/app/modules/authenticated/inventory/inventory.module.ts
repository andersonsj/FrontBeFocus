import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultInventoryComponent } from './consult-inventory/consult-inventory.component';
import { SharedModule } from '@shared/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ConsultInventoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    TableModule,
    ButtonModule
  ]
})
export class InventoryModule { }
