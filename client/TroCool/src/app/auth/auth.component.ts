import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    public emailVal: string;
    public passwordVal:string;

    constructor(private auth : AuthService,
                public router: Router,
                public cookie: CookieService) { }

    ngOnInit() {

    }

    onSubmit() {

        this.auth.checkLogin(this.emailVal,this.passwordVal).subscribe(
            (val) => {
                console.log("POST call successful value returned in body",val);

                if (val.result){
                    this.auth.isLoggedIn = true;
                    this.auth.id = val.id;
                    this.auth.email = val.email;
                    this.auth.nom = val.nom;
                    this.auth.prenom = val.prenom;
                    this.auth.admin = val.admin;
                    this.auth.ratio = val.ratio;
                    console.log(this.auth);

                    this.cookie.set('isLoggedIn','true');
                    this.cookie.set('email', val.email);
                    this.cookie.set('nom',val.nom);
                    this.cookie.set('prenom',val.prenom);
                    this.cookie.set('id', val.id);
                    this.cookie.set('admin', val.admin);
                    this.cookie.set('ratio', val.ratio);
                    if (val.notifie != undefined && val.notifie)
                        alert("L'administrateur vous notifie que votre ratio est trop bas.\n Attention votre compte risque d'être supprimer.");
                    this.router.navigateByUrl("/membre/propositions");
            }
            else{
                alert("Votre compte n'existe pas");
            }


        });
    }

    logout() {
        console.log('Tentative de déconnexion');

        alert("Vous êtes déconnecté.");
        this.auth.isLoggedIn = false;
        this.cookie.deleteAll("/");
        this.router.navigateByUrl("/");
    }

}
