import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { ServicesService } from '../services.service';
import { AuthService } from '../../auth.service';

import { NotificationService } from '@progress/kendo-angular-notification';
@Component({
    selector: 'app-liste-services',
    templateUrl: './liste-services.component.html',
    styleUrls: ['./liste-services.component.scss']
})
export class ListeServicesComponent implements OnInit {
    @ViewChild('template', { read: TemplateRef })
    public notificationTemplate: TemplateRef<any>;

    constructor(public service: ServicesService,
                public auth : AuthService,
                public router: Router,
                private notificationService: NotificationService) { }

    public services:Object[];
    public selection;
    public dispoChoisi: Object[];

    ngOnInit() {
        this.service.getServices().subscribe(res =>{
            this.services = res;
        });
    }

    onSelect(){
        console.log("details");
    }

    reserverService(idService){
        if (this.auth.isLoggedIn){
            if (this.auth.id != this.services[idService]["idMembre"]){
                console.log(this.dispoChoisi);
                let emprunt = {};
                emprunt["dates"] = this.dispoChoisi;
                emprunt["idMembre"] = this.auth.id;
                emprunt["idService"] = this.services[idService]["_id"];

                console.log(emprunt);

                this.service.empruntService(emprunt).subscribe(
                (res) => {
                    console.log("POST call successful value returned in body",res);
                    if (res.err) alert("Erreur lors de l'emprunt du service\n\n" + JSON.stringify(res.code));
                    else{
                        alert("Emprunt réussi");
                        this.service.getServices().subscribe(res =>{
                            this.services = res;
                        });
                        //this.router.navigateByUrl("/mesServices");
                    }
                });
            }
        }
        else {
            this.notificationService.show({
                content: 'Vous devez être connecté pour réserver un créneau.',
                animation: { type: 'slide', duration: 400 },
                position: { horizontal: 'center', vertical: 'top' },
                type: { style: 'error', icon: true },
                hideAfter: 4000,
            });
        }

        this.selection = undefined;
        this.dispoChoisi = [];

    }

}
