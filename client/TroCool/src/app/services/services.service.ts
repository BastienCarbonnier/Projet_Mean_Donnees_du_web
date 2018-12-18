import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    constructor(public http: HttpClient){}

    getServices(): Observable<any> {
        return this.http.get("http://localhost:8888/Services/");
    }
    getDispoService(idService,params): Observable<any> {
        return this.http.get("http://localhost:8888/Services/dispo/"+idService, {params : params});
    }
    insererService(data:any): Observable<any> {
        return this.http.post<any>("http://localhost:8888/Services/", data);
    }

    empruntService(data:any): Observable<any> {
        return this.http.put<any>("http://localhost:8888/Services/emprunt", data);
    }

    supprimerService(id): Observable<any> {
        return this.http.delete<any>("http://localhost:8888/Services/"+String(id));
    }



}
