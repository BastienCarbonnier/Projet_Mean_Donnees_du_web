import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = false;
    public email;
    public nom;
    public prenom;
    public id;
    public admin;
    public ratio;

    constructor(public http: HttpClient) { }

    checkLogin(email: string, password: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        let ident = {email: email, password: password};
        return this.http.post<any>("http://localhost:8888/Membres/checkLogin", ident);
    }
}
