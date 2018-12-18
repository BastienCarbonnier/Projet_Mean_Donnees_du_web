import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeBiensComponent } from './liste-biens/liste-biens.component';
import { CreationBienComponent } from './creation-bien/creation-bien.component';

import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: ListeBiensComponent
    },
    {
        path:'creation',
        component: CreationBienComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BiensRoutingModule { }
