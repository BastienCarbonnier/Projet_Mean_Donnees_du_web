import { Injectable } from '@angular/core';
import { Router,CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public authService: AuthService, public router: Router) { }

  canActivate():boolean{
      if (this.authService.isLoggedIn){return true;}
      console.log(this.authService);
      alert("Veuillez vous authentifier au préalable.");
      //this.router.navigateByUrl("/login");
      return false;
  }
}
