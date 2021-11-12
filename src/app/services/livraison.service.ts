import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livraison } from '../models/livraison';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  public getAllLivraisons(): Observable<Livraison[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/livraisons`);
  }

  public getLivraisonByReference(numeroBL: string ): Observable<Livraison[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/livraisons?numeroBL=`+numeroBL);
  }

  public getLivraisonById(idLivraison: number ) : Observable<Livraison> {
    return this.http.get<any>(`${this.apiServerUrl}/api/livraisons/`+ idLivraison);
  }  

  public createLivraison(livraison: Livraison ) : Observable<Livraison> {
    return this.http.post<any>(`${this.apiServerUrl}/api/livraisons/`, livraison);
  } 
}
