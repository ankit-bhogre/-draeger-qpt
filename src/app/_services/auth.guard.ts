import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router){}
  // console.log( localStorage.getItem('usertoken'));
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let newtoken = localStorage.getItem('usertoken');
      let userloggedId = localStorage.getItem('loginid');
      if(!!newtoken && userloggedId){  
        console.log('loggedin',userloggedId)
      return true;
    }
      else{this.router.navigate(['/login']);return false;}
  }
  
}
