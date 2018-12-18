import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeServicesComponent } from './liste-services/liste-services.component';
import { CreationServiceComponent } from './creation-service/creation-service.component';
import { AuthGuardService } from '../auth-guard.service';
const routes: Routes = [
    {
        path: '',
        component: ListeServicesComponent
    },
    {
        path:'creation',
        component: CreationServiceComponent,
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
export class ServicesRoutingModule { }
