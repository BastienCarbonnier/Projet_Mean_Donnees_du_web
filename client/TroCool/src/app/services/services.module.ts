import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';


import { NotificationModule } from '@progress/kendo-angular-notification';


import { ListeServicesComponent } from './liste-services/liste-services.component';
import { CreationServiceComponent } from './creation-service/creation-service.component';

import { ServicesRoutingModule } from './services-routing.module';
@NgModule({
  declarations: [ListeServicesComponent, CreationServiceComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatExpansionModule,
    FormsModule,
    IntlModule,
    DateInputsModule,
    DropDownsModule,
    NotificationModule
  ]
})
export class ServicesModule { }
