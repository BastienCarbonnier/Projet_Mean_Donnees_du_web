import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CookieService } from "ngx-cookie-service";

import 'bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MembresModule } from './membres/membres.module';
import { BiensModule } from './biens/biens.module';

import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { RechercheComponent } from './recherche/recherche.component';

import { NotificationModule } from '@progress/kendo-angular-notification';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RechercheComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DropDownsModule,
    DateInputsModule,
    NotificationModule
  ],
  providers: [AuthService,AuthGuardService,RoleGuardService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {  }
