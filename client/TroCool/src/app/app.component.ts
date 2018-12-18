import { Component, OnInit} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'TroCool';
    constructor(public auth: AuthService, public cookie: CookieService) {}
//AIzaSyAa_PhDZROGVd_-pE8nNrBSRpmmULAXKZk
    ngOnInit() {
        if (this.cookie.check('isLoggedIn')){
            this.auth.isLoggedIn = true;
            this.auth.email = this.cookie.get('email');
            this.auth.nom = this.cookie.get('nom');
            this.auth.prenom = this.cookie.get('prenom');
            this.auth.id = parseInt(this.cookie.get('id'));
            this.auth.admin = this.cookie.check('admin') ? true : false;
        }


    }

};
