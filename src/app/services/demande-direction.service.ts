
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DemandeDirection } from '../models/demande-direction';
import { Direction } from '../models/direction';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class DemandeDirectionService {

  private apiServerUrl = environment.apiBaseUrl+"/api/demandeDirection"
  constructor(private http : HttpClient) { }

  public getAllDemandeDir(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl+'/all')
  }
  public getDemandeDirByCodeStatus(codeStatus: String): Observable<any> {
    return this.http.get<any>(this.apiServerUrl+'/status?codeStatus='+codeStatus)
  }

  public genererDemande(direction : Direction): Observable<any> {
    return this.http.post<any>(this.apiServerUrl, direction)
  }

  public sendDemandeToDmg(demandeDirection : DemandeDirection): Observable<any> {
    return this.http.put<any>(this.apiServerUrl+'/sendToDmg', demandeDirection)
  }
  public dmgValidateDemandeToDmg(demandeDirection : DemandeDirection): Observable<any> {
    return this.http.put<any>(this.apiServerUrl+'/dmgValidate', demandeDirection)
  }
  public dmgSortieDemandeToDmg(demandeDirection : DemandeDirection): Observable<any> {
    return this.http.put<any>(this.apiServerUrl+'/dmgSortie', demandeDirection)
  }
}
