import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardDemande } from '../models/dashboard-demande';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getDashboardDemande(demandeur: string): Observable<DashboardDemande[]> {
    return this.http.get<any>(environment.apiBaseUrl+'/dashboard/demandes?demandeur='+demandeur)
  } 


}
