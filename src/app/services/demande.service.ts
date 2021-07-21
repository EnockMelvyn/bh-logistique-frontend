import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllDemandes(): Observable<Demande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes`);
  }

  public getDemandeByReference(numRefDemande: string ): Observable<Demande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes?numRefDemande=`+numRefDemande);
  }

  public getDemandeById(idDemande: number ) : Observable<Demande> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes/`+ idDemande);
  }  

  public createDemande(demande: Demande ) : Observable<Demande> {
    return this.http.post<any>(`${this.apiServerUrl}/api/demandes/`, demande);
  }  

  public updateDemande(idDemande: number, demande:Demande ) : Observable <Demande> {
    return this.http.put<any>(`${this.apiServerUrl}/api/demandes/`+idDemande, demande);
  }  

}
