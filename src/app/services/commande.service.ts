import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  public getAllCommandes(): Observable<Commande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/commandes`);
  }

  public getCommandeByReference(numeroBL: string ): Observable<Commande[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/commandes?numeroBL=`+numeroBL);
  }

  public getCommandeById(idCommande: number ) : Observable<Commande> {
    return this.http.get<any>(`${this.apiServerUrl}/api/commandes/`+ idCommande);
  }  

  public createCommande(commande: Commande ) : Observable<Commande> {
    return this.http.post<any>(`${this.apiServerUrl}/api/commandes/`, commande);
  } 
  
  public validateCommande(commande: Commande) : Observable<Commande> {
    return this.http.put<any>(`${this.apiServerUrl}/api/commandes/validate?idCommande=`+ commande.idCommande, commande);
  } 
  public refuseCommande(commande: Commande) : Observable<Commande> {
    return this.http.put<any>(`${this.apiServerUrl}/api/commandes/refuse?idCommande=`+ commande.idCommande, commande);
  } 


}
