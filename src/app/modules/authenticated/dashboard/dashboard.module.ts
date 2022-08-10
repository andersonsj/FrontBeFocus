import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardItemOneComponent } from './dashboard-item-one/dashboard-item-one.component';
import { DashboardItemTwoComponent } from './dashboard-item-two/dashboard-item-two.component';
import { DashboardItemThreeComponent } from './dashboard-item-three/dashboard-item-three.component';
import { DashboardItemFourComponent } from './dashboard-item-four/dashboard-item-four.component';
import { SharedModule } from '@shared/shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { VigilanteGuard } from 'app/vigilante/vigilante.guard';



@NgModule({
  declarations: [
    DashboardContentComponent,
    DashboardItemOneComponent,
    DashboardItemTwoComponent,
    DashboardItemThreeComponent,
    DashboardItemFourComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    NgxChartsModule,
    NgApexchartsModule
  ],

  providers: [VigilanteGuard]
})
export class DashboardModule { }
