import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { RechercheComponent } from './recherche/recherche.component';

const routes: Routes = [
    { path: '', component: RechercheComponent },
    { path: 'login', component: AuthComponent },
    {
        path: 'membre',
        loadChildren: './membres/membres.module#MembresModule'
    },
    {
        path: 'biens',
        loadChildren: './biens/biens.module#BiensModule'
    },
    {
        path: 'services',
        loadChildren: './services/services.module#ServicesModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
