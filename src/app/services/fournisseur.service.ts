import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/fournisseurs`);
  }

  public getFournisseurByCode(codeFournisseur: string ): Observable<Fournisseur[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/fournisseurs?codeFournisseur=`+codeFournisseur);
  }

  public getFournisseurById(idFournisseur: number ) : Observable<Fournisseur> {
    return this.http.get<any>(`${this.apiServerUrl}/api/fournisseurs/`+ idFournisseur);
  }  

  public createFournisseur(fournisseur: Fournisseur ) : Observable<Fournisseur> {
    return this.http.post<any>(`${this.apiServerUrl}/api/fournisseurs/`, fournisseur);
  }  

  public updateFournisseur(idFournisseur: number, fournisseur:Fournisseur ) : Observable <Fournisseur> {
    return this.http.put<any>(`${this.apiServerUrl}/api/fournisseurs/`+idFournisseur, fournisseur);
  }  
}
