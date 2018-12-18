import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { InscriptionComponent } from './inscription/inscription.component';
import { ListeMembresComponent } from './liste-membres/liste-membres.component';
import { ListeBiensMembreComponent } from './liste-biens-membre/liste-biens-membre.component';
import { ListeServicesMembreComponent } from './liste-services-membre/liste-services-membre.component';
import { ListesPropositionsMembreComponent } from './listes-propositions-membre/listes-propositions-membre.component';
import { ListeReservationsMembreComponent } from './liste-reservations-membre/liste-reservations-membre.component';
import { ListeResaBiensMembreComponent } from './liste-resa-biens-membre/liste-resa-biens-membre.component';
import { ListeResaServicesMembreComponent } from './liste-resa-services-membre/liste-resa-services-membre.component';
import { MembresRoutingModule } from './membres-routing.module';



@NgModule({
    declarations: [
        ListeMembresComponent,
        InscriptionComponent,
        ListeBiensMembreComponent,
        ListeServicesMembreComponent,
        ListesPropositionsMembreComponent,
        ListeReservationsMembreComponent,
        ListeResaBiensMembreComponent,
        ListeResaServicesMembreComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatExpansionModule,
        MembresRoutingModule,
        MatCardModule,
        IntlModule,
        DateInputsModule,
        DropDownsModule
    ],
    providers: [],
    exports : [ListeMembresComponent, InscriptionComponent, ListeBiensMembreComponent, ListeServicesMembreComponent,ListesPropositionsMembreComponent, ListeResaBiensMembreComponent]
})
export class MembresModule { }
