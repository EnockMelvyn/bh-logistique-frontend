import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://192.168.200.17:8081/auth/v1/user'

  constructor(private http : HttpClient, private router: Router) { }

  public createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/create`,user);
  }
  
  public connexionUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/connexion`,user);
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
