import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigilanteGuard } from 'app/vigilante/vigilante.guard';
import { AuthenticatedRouting } from './authenticated-routing.module';
import { SharedModule } from '@shared/shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderModule } from './order/order.module';
import { ClientModule } from './client/client.module';
import { InventoryModule } from './inventory/inventory.module';

@NgModule({
  declarations: [ContentUserComponent],
  imports: [
    CommonModule,
    AuthenticatedRouting,
    SharedModule,
    MaterialModule,
    DashboardModule,
    OrderModule,
    ClientModule,
    InventoryModule
  ],
  providers: [VigilanteGuard]
})
export class AuthenticatedModule { }
