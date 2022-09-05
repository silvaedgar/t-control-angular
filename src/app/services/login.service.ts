import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/base-url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  URL:string= baseUrl + "auth/"

  public generateToken(loginDTO : any) {
    return this.httpClient.post(this.URL+"login",loginDTO);
  }

  public getCurrentUser(){
    return this.httpClient.get(this.URL+"current-user");
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(rolFind : string){
    let user = this.getUser();
    console.log(user)
    let retorno = false
    if (user != null) {
      for (let index = 0; index < user.authorities.length; index++) {
        const element = user.authorities[index];
        console.log(element)
        if (element.authority == rolFind) {
          retorno = true
        }
      }
    }
    return retorno;
    // return user.authorities;
  }


}
