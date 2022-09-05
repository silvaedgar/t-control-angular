import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {

  constructor(private _loginService : LoginService, private _snack : SnackbarService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("logueado ",this._loginService.isLoggedIn())
      console.log("ADMIN", !this._loginService.getUserRole('Admin'))
      if (!this._loginService.isLoggedIn() || !this._loginService.getUserRole('Admin')  ) {
        this._snack.showSnackBar("Usuario no autorizado para acceder a este recurso","Aceptar",4000,'','')
        return false;
      }
      return true
  }

}
