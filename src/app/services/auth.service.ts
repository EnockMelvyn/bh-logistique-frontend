import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://192.168.200.17:8081/auth/v1/user'
  // private apiwSO2= 'http://localhost:8290/services/RESTDataService/personnel'

  private apiGetInfosAppli = environment.apiBaseUrl +'/api/user'

  constructor(private http : HttpClient, private router: Router) { }

  public createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/create`,user);
  }
  public updateUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/update`,user);
  }
  public createProfilPersonnel(profPerso: any): Observable<any> {
    return this.http.post<any>(`${this.apiGetInfosAppli}/addProfilPersonnel`,profPerso);
  }
  
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl+'/all')
  }

  public connexionUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/connexion`,user);
  }

  public getInfosSupUserByEmail(email : string) : Observable<any>{
    // const headerDict = {
    //   // 'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new HttpHeaders(headerDict), 
    // };
    return this.http.get<any>(this.apiGetInfosAppli+'?email='+email)
  }
  public disconnectUser (): void {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
  
  public isUserConnected(): boolean {
    if(localStorage.getItem('userConnected')){
      return true
    }else{
      return false;
    }
  }
  public userConnected(): User {
    if( localStorage.getItem('userConnected') != null ){
      return JSON.parse(localStorage.getItem('userConnected')!)
    }else{
      return {};
    }
  }

}
