import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
});

export class ConnectMembreService {

    constructor(private http: HttpClient) { }

    checkLogin(email, password): Observable<any> {
        const httpOptions = {
            "headers": new HttpClient({
                'Content-Type':  'application/json',
                'Authorization': 'my-auth-token'
            })
        };
        console.log("email = "+email+" password = "+password);
        let ident = {"email": String(email), "password": String(password)};
        return this.http.post<any>("http://localhost:8888/Membres/checkLogin", ident, httpOptions).pipe(
            tap((res: any) => this.log(`added hero w/ id=${res.res}`)),
            catchError(this.handleError<any>('addHero'))
        );
    }

}
