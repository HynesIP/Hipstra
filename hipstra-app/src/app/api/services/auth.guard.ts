import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    private auth: AuthService
    ){}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    

  console.log(this.auth.isTokenExpired())

    if(this.auth.isTokenExpired()){
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }

    
    
  }
  
}
