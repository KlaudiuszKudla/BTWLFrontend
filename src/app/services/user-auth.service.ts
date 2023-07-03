import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){
    localStorage.setItem('roles', JSON.stringify(roles));

  }

  public getRoles() : [] {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(jwtToken: string){
    localStorage.setItem('token', jwtToken);
  }

  public getToken() : string{
    return localStorage.getItem('token')!;
  }

  public setUserEmail(userEmail: string){
    localStorage.setItem('userEmail', userEmail);
  }

  public getUserEmail() : string{
    return localStorage.getItem('userEmail')!;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getToken()!=null;
  }

  public haveAccess(){
    var logginToken=localStorage.getItem('token')||'';
    var _extractedToken=logginToken.split('.')[1];
    var _atobData=atob(_extractedToken);
    var _finalData=JSON.parse(_atobData);
    console.log(_finalData);
  }
}
