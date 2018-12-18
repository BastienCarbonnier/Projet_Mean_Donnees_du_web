import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BiensService {

    constructor(public http: HttpClient){}

    getBiens(): Observable<any> {
        return this.http.get("http://localhost:8888/Biens/");
    }
    getDispoBien(idBien,params): Observable<any> {
        return this.http.get("http://localhost:8888/Biens/dispo/"+idBien, {params : params});
    }

    insererBien(data:any): Observable<any> {
        return this.http.post<any>("http://localhost:8888/Biens/", data);
    }

    empruntBien(data:any): Observable<any> {
        return this.http.put<any>("http://localhost:8888/Biens/emprunt", data);
    }

    supprimerBien(id): Observable<any> {
        return this.http.delete<any>("http://localhost:8888/Biens/"+String(id));
    }



}
