import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl+'/api/user'
  constructor(private http:HttpClient) { }

  public getUserByEmail(email : string) : any {
    return this.http.get<any>(this.apiServerUrl+'?email='+email)
  }
}
