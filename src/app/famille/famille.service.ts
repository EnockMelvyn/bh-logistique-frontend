import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Famille } from './famille';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  private apiServerUrl = ''

  constructor(private http: HttpClient) {}

  public getAllFamilles(): Observable<Famille[]> {
    return this.http.get<any>('${this.apiServerUrl}/familles');
  }

  public getFamilleByCode(codeFamille: string ): Observable<Famille[]> {
    return this.http.get<any>('${this.apiServerUrl}/familles?codeFamille='+codeFamille);
  }

  public getFamilleById(idFamille: string ) : Observable<Famille> {
    return this.http.get<any>('${this.apiServerUrl}/familles/'+ idFamille);
  }  

  public createFamille(famille: Famille ) : Observable<Famille> {
    return this.http.post<any>('${this.apiServerUrl}/familles/', famille);
  }  

  public updateFamille(idFamille: string, famille:Famille ) : Observable <Famille> {
    return this.http.put<any>('${this.apiServerUrl}/familles/'+idFamille, famille);
  }  

}
