import { NgModule } from '@angular/core';
import { MaterialModule } from '@modules/material/material.module';
import { SharedModule } from '@shared/shared/shared.module';
import { VigilanteGuard } from 'app/vigilante/vigilante.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MaterialModule
  ],
  providers: [VigilanteGuard],
  exports: [
    LoginComponent
  ]
})

export class AuthModule { }
