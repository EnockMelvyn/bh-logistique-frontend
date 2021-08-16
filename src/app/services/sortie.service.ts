import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sortie } from '../models/sortie';

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllSorties(): Observable<Sortie[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sorties`);
  }

  public getSortieByReference(reference: string ): Observable<Sortie[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sorties?reference=`+reference);
  }

  public getSortieById(idSortie: number ) : Observable<Sortie> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sorties/`+ idSortie);
  }  

  public createSortie(sortie: Sortie ) : Observable<Sortie> {
    return this.http.post<any>(`${this.apiServerUrl}/api/sorties/`, sortie);
  }  

  public updateSortie(idSortie: number, sortie:Sortie ) : Observable <Sortie> {
    return this.http.put<any>(`${this.apiServerUrl}/api/sorties/`+idSortie, sortie);
  }  
  public validateOrRefuseSortie(idSortie: number, validateOrRefuse: String) : Observable <Sortie> {
    return this.http.put<any>(`${this.apiServerUrl}/api/sorties/`+validateOrRefuse+`/`+ idSortie, null);
  }  
}
