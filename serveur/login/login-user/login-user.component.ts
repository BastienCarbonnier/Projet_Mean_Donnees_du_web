import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectMembreService } from '../connect-membre.service';


@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css'],
    providers: [ConnectMembreService]
})
export class LoginUserComponent implements OnInit {

    private model: any = {};
    private connected = false;
    constructor(
        private router: Router,
        private service: ConnectMembreService
    ) { }

    ngOnInit() { }

    login() {
        console.log('Tentative de connexion');
        //ConnectMembreService.checkLogin(this.model.username,this.model.password);
        this.service.checkLogin(this.model.username,this.model.password).subscribe(res =>{this.connected = res.result;});
        // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
        localStorage.setItem('user', JSON.stringify({login : this.model.username}));
        //this.router.navigate(['/home']);
    }
}
