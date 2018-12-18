import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-liste-resa-biens-membre',
    templateUrl: './liste-resa-biens-membre.component.html',
    styleUrls: ['./liste-resa-biens-membre.component.scss']
})
export class ListeResaBiensMembreComponent implements OnInit {

    constructor(public service: MembresService,public auth : AuthService) { }

    public resa_biens:any;

    ngOnInit() {
        this.service.getReservationsBiensMembre(this.auth.id).subscribe(res =>{this.resa_biens = res;});
    }


}
