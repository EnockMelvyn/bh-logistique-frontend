import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://192.168.200.17:8081/auth/v1/user'

  constructor(private http : HttpClient) { }

  public createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/create`,user);
  }
  
  public connexionUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/connexion`,user);
  }
  
  public isUserConnected(): boolean {
    if(localStorage.getItem('userConnected')){
      return true
    }else{
      return false;
    }
  }
  public userConnected(): any {
    if(localStorage.getItem('userConnected')){
      return JSON.parse(localStorage.getItem('userConnected')!)
    }else{
      return false;
    }
  }

}
