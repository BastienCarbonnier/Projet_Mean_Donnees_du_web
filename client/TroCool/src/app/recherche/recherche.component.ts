import { Component, OnInit } from '@angular/core';

import { IntlService } from '@progress/kendo-angular-intl';

import { BiensService } from '../biens/biens.service';
import { ServicesService } from '../services/services.service';
import { AuthService } from '../auth.service';
import { RechercheService } from './recherche.service';

@Component({
    selector: 'app-recherche',
    templateUrl: './recherche.component.html',
    styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

    constructor(private bien: BiensService,
                private service: ServicesService,
                private auth : AuthService,
                private intl: IntlService,
                private rech: RechercheService) { }

    public dateMin: Date = new Date();
    public dateMax: Date;
    public texte: string;
    public errors:boolean = false;
    newKeyword:string;
    keywords:string[] = [];
    public results=[{"nom":"essai"}];

    currentChoice: string = "Biens et Services";
    choices: string[] = ["Biens et Services","Biens","Services"];

    public chooseBiens:boolean = false;
    public chooseServices:boolean = false;

    public biens = [];
    public services =[];

    public selection;
    public dispoChoisi: Object[];


    ngOnInit() {

    }

    addKeyword(){

        this.keywords.push(this.newKeyword);

        this.newKeyword = "";

    }
    deleteKeyword(index:number){
        this.keywords.splice(index,1);
    }

    onSubmit(){

        this.errors = false;
        //db.DisponibilitesBiens.find({"idBien": 1,'dates.date': { '$gte': '2018-12-16T02:16:35.954Z' }});
        let data = {};
        data["dateMin"] =this.dateMin.toISOString();
        if (this.dateMax !== undefined) data["dateMax"] = this.dateMax.toISOString();
        if (this.texte != undefined)
            Array.prototype.push.apply(this.keywords,this.texte.split(" "));
        data["keywords"] = this.keywords;
        console.log(data["keywords"]);

        if (this.currentChoice =="Services"){
            this.chooseServices = true;
            this.rech.getResultRechercheServices(data).subscribe(res =>{

                this.services= res;
                console.log(res);
            });
        }
        else if (this.currentChoice =="Biens"){
            this.chooseBiens = true;
            console.log(data);
            this.rech.getResultRechercheBiens(data).subscribe(res =>{
                console.log(res);

                this.biens= res;

                console.log(res);
            });
        }
        else{
            this.chooseBiens = true;
            this.chooseServices = true;
            this.rech.getResultRechercheServices(data).subscribe(res =>{
                this.services= res;
                console.log(res);
            });
            this.rech.getResultRechercheBiens(data).subscribe(res =>{
                this.biens= res;
                console.log(res);
            });
        }

    }



    reserverBien(idBienTab,idBien){
        if (this.auth.isLoggedIn){
            console.log(this.dispoChoisi);
            let emprunt = {};
            emprunt["dates"] = this.dispoChoisi;
            emprunt["idMembre"] = this.auth.id;
            emprunt["idBien"] = this.biens[idBienTab]["idBien"];

            console.log(emprunt);

            this.bien.empruntBien(emprunt).subscribe(
            (res) => {
                console.log("POST call successful value returned in body",res);
                if (res.err) alert("Erreur lors de l'emprunt du bien\n\n" + JSON.stringify(res.code));
                else{
                    alert("Emprunt réussi");
                    let params = {"dateMin":this.dateMin.toISOString()};
                    if (this.dateMax !==undefined) params["dateMax"]=this.dateMax.toISOString();

                    this.bien.getDispoBien(idBien,params).subscribe(res =>{
                        console.log(res);
                        this.biens[idBienTab].dates = res.dates;
                    });
                }
            });
        }
        else alert("Vous devez vous connecter pour pouvoir emprunter.");
        this.selection = undefined;
        this.dispoChoisi = [];


    }

    reserverService(idServiceTab,idService){
        if (this.auth.isLoggedIn){
            console.log(this.dispoChoisi);
            let emprunt = {};
            emprunt["dates"] = this.dispoChoisi;
            emprunt["idMembre"] = this.auth.id;
            emprunt["idService"] = this.services[idServiceTab]["idService"];

            console.log(emprunt);

            this.service.empruntService(emprunt).subscribe(
            (res) => {
                console.log("POST call successful value returned in body",res);
                if (res.err) alert("Erreur lors de l'emprunt du service\n\n" + JSON.stringify(res.code));
                else{
                    alert("Emprunt réussi");
                    let params = {"dateMin":this.dateMin.toISOString()};
                    if (this.dateMax !==undefined) params["dateMax"]=this.dateMax.toISOString();

                    this.service.getDispoService(idService,params).subscribe(res =>{
                        console.log(res);
                        this.services[idServiceTab].dates = res.dates;
                    });
                }
            });
        }
        else alert("Vous devez vous connecter pour pouvoir emprunter.");
        this.selection = undefined;
        this.dispoChoisi = [];


    }

}
