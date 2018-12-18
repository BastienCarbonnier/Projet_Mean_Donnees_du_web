import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BiensService } from '../biens.service';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-liste-biens',
    templateUrl: './liste-biens.component.html',
    styleUrls: ['./liste-biens.component.scss']
})
export class ListeBiensComponent implements OnInit {

    constructor(public service: BiensService, public auth : AuthService, public router: Router) { }

    public biens:Object[];
    public selection;
    public dispoChoisi: Object[];

    ngOnInit() {
        this.service.getBiens().subscribe(res =>{
            this.biens = res;
        });
    }

    reserverBien(idBien){
        if (this.auth.isLoggedIn){
            if (this.auth.id != this.biens[idBien]["idMembre"]){
                console.log(this.dispoChoisi);
                let emprunt = {};
                emprunt["dates"] = this.dispoChoisi;
                emprunt["idMembre"] = this.auth.id;
                emprunt["idBien"] = this.biens[idBien]["_id"];

                console.log(emprunt);

                this.service.empruntBien(emprunt).subscribe(
                (res) => {
                    console.log("POST call successful value returned in body",res);
                    if (res.err) alert("Erreur lors de l'emprunt du bien\n\n" + JSON.stringify(res.code));
                    else{
                        alert("Emprunt réussi");
                        this.auth.ratio = parseInt(this.auth.ratio) - 1;
                        this.service.getBiens().subscribe(res =>{
                            this.biens = res;
                        });


                    }
                });
            }
            else{
                alert("Vous ne pouvez pas emprunter vos propres propositions.");
            }
        }
        else alert("Vous devez vous connecter pour pouvoir emprunter.");
        this.selection = undefined;
        this.dispoChoisi = [];


    }

}
