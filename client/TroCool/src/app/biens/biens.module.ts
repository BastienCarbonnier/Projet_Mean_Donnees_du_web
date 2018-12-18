import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ListeBiensComponent } from './liste-biens/liste-biens.component';
import { DetailsBienComponent } from './details-bien/details-bien.component';
import { CreationBienComponent } from './creation-bien/creation-bien.component';

import { BiensRoutingModule } from './biens-routing.module';



@NgModule({
    declarations: [ListeBiensComponent, DetailsBienComponent, CreationBienComponent],
    imports: [
        CommonModule,
        MatExpansionModule,
        FormsModule,
        IntlModule,
        DateInputsModule,
        DropDownsModule,
        BiensRoutingModule,
        MatCardModule
    ],
    exports : [ListeBiensComponent,CreationBienComponent]
})
export class BiensModule { }
