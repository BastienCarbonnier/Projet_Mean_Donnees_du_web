import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MembresService {
    constructor(private http: HttpClient){}

    getMembres(): Observable<any> {
        return this.http.get("http://localhost:8888/Membres/");
    }

    inscrireMembre(data:any): Observable<any> {
        return this.http.post<any>("http://localhost:8888/Membres/", data);
    }

    getBiensMembre(id){
        return this.http.get("http://localhost:8888/Biens?idMembre="+String(id));
    }
    getServicesMembre(id){
        return this.http.get("http://localhost:8888/Services?idMembre="+String(id));
    }
    getReservationsBiensMembre(id){
        return this.http.get("http://localhost:8888/Utilisations/Bien/"+String(id));
    }
    getReservationsServicesMembre(id){
        return this.http.get("http://localhost:8888/Utilisations/Service/"+String(id));
    }

    envoyerNotificationMembre(idMembre,val){
        return this.http.put<any>("http://localhost:8888/Membres/", {"id": idMembre,"notifie": val});
    }
}
