import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-liste-services-membre',
  templateUrl: './liste-services-membre.component.html',
  styleUrls: ['./liste-services-membre.component.scss']
})
export class ListeServicesMembreComponent implements OnInit {

    constructor(public service: MembresService,public auth : AuthService) { }

    public services:any = [];

    ngOnInit() {
        this.service.getServicesMembre(this.auth.id).subscribe(res =>{this.services = res;});
    }

}
