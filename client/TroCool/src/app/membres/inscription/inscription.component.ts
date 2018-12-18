import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    constructor(public membre: MembresService,public auth : AuthService, public router: Router) { }
    data:any ={};
    ngOnInit() {

    }

    onSubmit(){
        this.membre.inscrireMembre(this.data).subscribe(
            (res) => {
                console.log("POST call successful value returned in body",res);
                if (res.err) alert('Erreur lors de la création\n\n' + JSON.stringify(res.code));
                else{
                    alert("Inscription réussi\n\n Vous êtes désormais connecté");
                    this.auth.isLoggedIn = true;
                    this.auth.id = res.id;
                    this.auth.email = res.email;
                    this.auth.nom = res.nom;
                    this.auth.prenom = res.prenom;
                    this.auth.admin = res.admin;
                    this.router.navigateByUrl("/");
                }
            });
        }

    }
