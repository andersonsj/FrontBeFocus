import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeContentComponent } from './layout/be-content/be-content.component';
import { VigilanteGuard } from './vigilante/vigilante.guard';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: BeContentComponent,
      children: [
        {
          path: 'auth',
          loadChildren: () =>
            import('app/modules/auth/auth.module').then((m) => m.AuthModule)
        },
        {
          path: 'authenticated',
          canActivateChild: [VigilanteGuard],
          loadChildren: () =>
            import('app/modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule)
        },
        {
          path: '**',
          redirectTo: 'home',
          pathMatch: 'full'
        }
      ]
    },
  
    {
      path: '**',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule { }