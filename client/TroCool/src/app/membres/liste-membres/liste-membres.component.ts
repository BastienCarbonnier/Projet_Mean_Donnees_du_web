import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.css']
})
export class ListeMembresComponent implements OnInit {

  constructor(public membre: MembresService,
              public auth: AuthService,
              public router: Router) { }

  public membres:Object[];

  ngOnInit() {
      this.membre.getMembres().subscribe(res =>{this.membres = res;});
  }

  notifierMembre(idMembre){
      this.membre.envoyerNotificationMembre(idMembre,true).subscribe(res =>{
          alert("Le membre sera notifier à sa prochaine connexion");
          this.membre.getMembres().subscribe(res =>{this.membres = res;});
      });
  }

  arretNotifierMembre(idMembre){
      this.membre.envoyerNotificationMembre(idMembre,false).subscribe(res =>{
          alert("Le membre ne sera plus notifié");
          this.membre.getMembres().subscribe(res =>{this.membres = res;});
      });
  }

}
