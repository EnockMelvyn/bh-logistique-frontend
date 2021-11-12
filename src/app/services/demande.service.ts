import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  page_code = [
    {
      "page": "valideParSuperieur",
      "code": "VALIDE_PAR_SUPERIEUR",
      "libelle": "Validé par supérieur"
    },
    {
      "page": "refuse",
      "code": "REJETEE",
      "libelle": "Rejetée"
    },
    {
      "page": "enTraitement",
      "code": "VALIDEE_POUR_TRAITEMENT",
      "libelle": "En cours de traitement"
    },
    {
      "page": "visaDemandeur",
      "code": "VISA_DEMANDEUR",
      "libelle": "En attente du visa demandeur"
    },
    {
      "page": "traitee",
      "code": "TRAITEE",
      "libelle": "Traitée"
    },
    {
      "page": "",
      "code": "EN_ATTENTE",
      "libelle": "En attente"
    },
  ]

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getCorrespondancePageCode(): any {
    return this.page_code;
  }
  public getAllDemandes(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes`);
  }

  public getDemandeByReference(numRefDemande: string ): Observable<Demande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes?numRefDemande=`+numRefDemande);
  }
  
  public getDemandeByStatut(statut: string ): Observable<Demande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes/statut?code=`+statut);
  }
  
  public getDemandeByStatutEtDirection(statut: string|null, idDirection: number|null ): Observable<Demande[]> {
    let params = new  HttpParams();
    if(statut!=null && statut?.length>0){
      params=params.append('statut', statut)
    }
    if(idDirection!=null && idDirection>0){
      params=params.append('idDirection', idDirection)
    }
    return this.http.get<any>(this.apiServerUrl+'/api/demandes/statutEtDirection',   {params: params});
  }


  public getDemandeByStatusEtDirection(idStatus: number|null, idDirection: number|null ): Observable<Demande[]> {
    let params = new  HttpParams();
    if(idStatus!=null && idStatus>0){
      params=params.append('statut', idStatus)
    }
    if(idDirection!=null && idDirection>0){
      params=params.append('idDirection', idDirection)
    }
    return this.http.get<any>(this.apiServerUrl+'/api/demandes/statutEtDirection', {params: params});
  }

  public getDemandeById(idDemande: number ) : Observable<Demande> {
    return this.http.get<any>(`${this.apiServerUrl}/api/demandes/`+ idDemande);
  }  

  public createDemande(demande: Demande ) : Observable<Demande> {
    return this.http.post<any>(`${this.apiServerUrl}/api/demandes/`, demande);
  }  
  public createDemande2(demande: Demande ) : Observable<Demande> {
    return this.http.post<any>(`${this.apiServerUrl}/api/demandes/create`, demande);
  }  

  public updateDemande(idDemande: number, demande:Demande ) : Observable <Demande> {
    return this.http.put<any>(`${this.apiServerUrl}/api/demandes/`+idDemande, demande);
  }

  public updateDemande2(demande:Demande ) : Observable <Demande> {
    return this.http.post<any>(`${this.apiServerUrl}/api/demandes/update`, demande);
  }

  public validateOrRefuseDemande(idDemande: number, validateOrRefuse: String) : Observable <Demande> {
    return this.http.put<any>(`${this.apiServerUrl}/api/demandes/`+validateOrRefuse+`/`+ idDemande, null);
  }  

}
