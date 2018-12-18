import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-liste-resa-services-membre',
  templateUrl: './liste-resa-services-membre.component.html',
  styleUrls: ['./liste-resa-services-membre.component.scss']
})
export class ListeResaServicesMembreComponent implements OnInit {

  constructor(public service: MembresService,public auth : AuthService) { }

  public resa_services:any;

  ngOnInit() {
      this.service.getReservationsServicesMembre(this.auth.id).subscribe(res =>{this.resa_services = res;});
  }

}
