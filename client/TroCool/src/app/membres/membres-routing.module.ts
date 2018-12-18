import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListeMembresComponent } from './liste-membres/liste-membres.component';
import { ListeBiensMembreComponent } from './liste-biens-membre/liste-biens-membre.component';
import { ListeServicesMembreComponent } from './liste-services-membre/liste-services-membre.component';
import { ListesPropositionsMembreComponent } from './listes-propositions-membre/listes-propositions-membre.component';
import { ListeReservationsMembreComponent } from './liste-reservations-membre/liste-reservations-membre.component';
import { ListeResaBiensMembreComponent } from './liste-resa-biens-membre/liste-resa-biens-membre.component';
import { ListeResaServicesMembreComponent } from './liste-resa-services-membre/liste-resa-services-membre.component';
import { InscriptionComponent } from './inscription/inscription.component';

import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: ListeMembresComponent
    },
    {
        path: 'services',
        component: ListeServicesMembreComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'propositions',
        component: ListesPropositionsMembreComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'biens',
        component: ListeBiensMembreComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'reservations',
        component: ListeReservationsMembreComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'inscription',
        component: InscriptionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembresRoutingModule { }
