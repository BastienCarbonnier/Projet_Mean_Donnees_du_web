import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeServicesComponent } from './liste-services/liste-services.component';
import { CreationServiceComponent } from './creation-service/creation-service.component';

const routes: Routes = [
    {
        path: '',
        component: ListeServicesComponent
    },
    {
        path:'creation',
        component: CreationServiceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRoutingModule { }
