import { ContentUserComponent } from './content-user/content-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentClientComponent } from './client/content-client/content-client.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { GridClientComponent } from './client/grid-client/grid-client.component';
import { ManagerOrdersComponent } from './order/manager-orders/manager-orders.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';

const routes: Routes = [
    {
        path: 'content-user',
        component: ContentUserComponent,
        children: [
            {
                path: 'content-client',
                component: ContentClientComponent
            },
            {
                path: 'dashboard',
                component: DashboardContentComponent

            },
            {
                path: 'grid-client',
                component: GridClientComponent
            },
            {
                path: 'manager-orders',
                component: ManagerOrdersComponent
            },
            {
                path: 'create-order',
                component: CreateOrderComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthenticatedRouting { }