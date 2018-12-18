import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-services-membre',
  templateUrl: './liste-services-membre.component.html',
  styleUrls: ['./liste-services-membre.component.scss']
})
export class ListeServicesMembreComponent implements OnInit {

    constructor(public membre: MembresService,
                public auth : AuthService,
                public router : Router,
                public service: ServicesService) { }

    public services:any = [];

    ngOnInit() {
        this.membre.getServicesMembre(this.auth.id).subscribe(res =>{this.services = res;});
    }

    supprimerService(id){
        this.service.supprimerService(id).subscribe(res =>{
            this.router.navigateByUrl("/membre/propositions");
        });
    }
}
