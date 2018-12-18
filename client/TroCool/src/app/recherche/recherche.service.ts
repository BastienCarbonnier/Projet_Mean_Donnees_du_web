import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RechercheService {

    constructor(public http: HttpClient) { }

    getResultRecherche(keywords){
        console.log(keywords);
    }
    // http://localhost:8888/Services/research?keywords[]=cours&dateMin=2019-01-24&ordreDate=-1
    getResultRechercheServices(data): Observable<any> {
        return this.http.get("http://localhost:8888/Services/research",{params : data});
    }

    getResultRechercheBiens(data): Observable<any> {
        return this.http.get("http://localhost:8888/Biens/research",{params : data});
    }

}
