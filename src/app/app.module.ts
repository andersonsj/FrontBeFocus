import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { BeContentComponent } from './layout/be-content/be-content.component';
import { BeHeaderComponent } from './layout/be-header/be-header.component';
import { BeFooterComponent } from './layout/be-footer/be-footer.component';
import { VigilanteGuard } from './vigilante/vigilante.guard';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeSideComponent } from './layout/be-side/be-side.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { MaterialModule } from '@modules/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BeContentComponent,
    BeHeaderComponent,
    BeFooterComponent,
    BeSideComponent,
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MaterialModule,
    FontAwesomeModule
  ],
  providers: [VigilanteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
