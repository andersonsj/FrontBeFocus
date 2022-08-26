import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultInventoryComponent } from './consult-inventory/consult-inventory.component';
import { SharedModule } from '@shared/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ConsultInventoryComponent,
    ProductDiscountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    TableModule,
    ButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class InventoryModule { }
