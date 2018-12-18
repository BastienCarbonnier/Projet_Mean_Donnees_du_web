import { Component, OnInit } from '@angular/core';
import { MembresService } from '../membres.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.css']
})
export class ListeMembresComponent implements OnInit {

  constructor(public service: MembresService,
              public auth: AuthService) { }

  public membres:Object[];

  ngOnInit() {
      this.service.getMembres().subscribe(res =>{this.membres = res;});
  }
}
