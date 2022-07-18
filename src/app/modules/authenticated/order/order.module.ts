import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { ManagerOrdersComponent } from './manager-orders/manager-orders.component';
import { GetOrderComponent } from './get-order/get-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from '@shared/shared/shared.module';

@NgModule({
  declarations: [
    ManagerOrdersComponent,
    GetOrderComponent,
    CreateOrderComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    NgxPrintModule
  ]
})
export class OrderModule { }
