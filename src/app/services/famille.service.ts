import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Famille } from '../models/famille';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllFamilles(): Observable<Famille[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/familles`);
  }

  public getFamilleByCode(codeFamille: string ): Observable<Famille[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/familles?codeFamille=`+codeFamille);
  }

  public getFamilleById(idFamille: number ) : Observable<Famille> {
    return this.http.get<any>(`${this.apiServerUrl}/api/familles/`+ idFamille);
  }  

  public createFamille(famille: Famille ) : Observable<Famille> {
    return this.http.post<any>(`${this.apiServerUrl}/api/familles/`, famille);
  }  

  public updateFamille(idFamille: number, famille:Famille ) : Observable <Famille> {
    return this.http.put<any>(`${this.apiServerUrl}/api/familles/`+idFamille, famille);
  }  

}
