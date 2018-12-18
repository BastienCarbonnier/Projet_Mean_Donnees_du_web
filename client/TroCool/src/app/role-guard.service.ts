import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public authService: AuthService, public router: Router) {}

    canActivate(): boolean {
        console.log(this.authService.admin)
        if (!this.authService.isLoggedIn) {
            //this.router.navigate(['login']);
            alert("Veuillez vous authentifier au préalable.");
            return false;
        }
        else if(!this.authService.admin){
            alert("Vous n'avez pas les droits administrateurs.")
            return false;
        }
        return true;
    }
}
