import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';
import { BiensService } from '../../biens/biens.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-liste-biens-membre',
    templateUrl: './liste-biens-membre.component.html',
    styleUrls: ['./liste-biens-membre.component.scss']
})
export class ListeBiensMembreComponent implements OnInit {

    constructor(public membre: MembresService,
                public bien: BiensService,
                public auth : AuthService,
                public router: Router) { }

    public biens:any= [];

    ngOnInit() {
        this.membre.getBiensMembre(this.auth.id).subscribe(res =>{this.biens = res;});
    }

    supprimerBien(id){
        this.bien.supprimerBien(id).subscribe(res =>{
            console.log("success");
            this.router.navigateByUrl("/membre/propositions");
        });
    }

}
