import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleAdminGuard implements CanActivate {

  constructor(private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let hasRole : boolean
      const roles : string[] = route.data.role
      
      hasRole = roles.some(element =>  this.authService.userConnected().profileRole?.includes(element))
      // const hasRole = route.data.role.some( element => this.authService.userConnected().profileRole?.includes(element)) ? true : false;

      if(hasRole== false) {
        window.alert(hasRole)
        alert("Vous n'êtes pas autorisé à accéder à cette page")
      }
    
      return hasRole
  }
  
}
