import { Component, OnInit } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Router } from '@angular/router';

import { BiensService } from '../biens.service';
import { AuthService } from '../../auth.service';


@Component({
    selector: 'app-creation-bien',
    templateUrl: './creation-bien.component.html',
    styleUrls: ['./creation-bien.component.scss']
})
export class CreationBienComponent implements OnInit {

    constructor(private bien: BiensService,private auth : AuthService, private router: Router, private intl: IntlService) { }
    data:any ={};
    newKeyword:string;
    keywords:string[] = [];

    public currentDate: Date;
    public currentDateISO: string;
    public matin:boolean;
    public aprem:boolean;
    dispos:Object[];

    ngOnInit() {
        //this.user = {"dispo": new Date()};
        this.dispos = [];
        this.currentDate= new Date();
        this.matin = false;
        this.aprem = false;
        this.currentDateISO = this.currentDate.toISOString();
    }
    addKeyword(){

        this.keywords.push(this.newKeyword);

        this.newKeyword = "";

    }
    deleteKeyword(index:number){
        this.keywords.splice(index,1);

    }
    onSubmit(){
        this.data.motsClefs = this.keywords;
        this.data.idMembre = this.auth.id;
        this.data.dates = this.dispos;
        this.bien.insererBien(this.data).subscribe(
        (res) => {
            console.log("POST call successful value returned in body",res);
            if (res.err) alert('Erreur lors de la création du bien\n\n' + JSON.stringify(res.code));
            else{
                alert("Création réussi");
                this.router.navigateByUrl("/membre/biens");
            }
        });
    }

    public handleChange(value: Date) {

        this.currentDate = value;
        this.currentDateISO = value.toISOString();

    }


    addDate() {
        let dispo = {};
        dispo["date"] = this.currentDateISO;
        dispo["matin"] = this.matin;
        dispo["aprem"] = this.aprem;
        this.dispos.push(dispo);
        console.log(this.dispos)

        this.matin = false;
        this.aprem = false;

    }

    deleteDispo(index:number){
        this.dispos.splice(index,1);

    }

}