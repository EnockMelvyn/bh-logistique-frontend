import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiServerUrl = environment.apiBaseUrl+'/api/status'
  constructor(private http : HttpClient) { }

  public getAllStatus(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl+'/all') 
  }

  public getStatusByCode(codeStatus: string) : Observable<any>{
    return this.http.get<any>(this.apiServerUrl+'/status?codeStatus='+codeStatus)
  }
}
