import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SousFamille } from '../models/sousFamille';

@Injectable({
  providedIn: 'root'
})
export class sousFamilleService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllSousFamilles(): Observable<SousFamille[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sousFamilles`);
  }

  public getSousFamilleByCode(codeSousFamille: string ): Observable<SousFamille[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sousFamilles?codeFamille=`+codeSousFamille);
  }

  public getSousFamilleById(idSousFamille: number ) : Observable<SousFamille> {
    return this.http.get<any>(`${this.apiServerUrl}/api/sousFamilles/`+ idSousFamille);
  }  

  public createSousFamille(sousFamille: SousFamille ) : Observable<SousFamille> {
    return this.http.post<any>(`${this.apiServerUrl}/api/sousFamilles/`, sousFamille);
  }  

  public updateSousFamille(idSousFamille: number, sousFamille:SousFamille ) : Observable <SousFamille> {
    return this.http.put<any>(`${this.apiServerUrl}/api/sousFamilles/`+idSousFamille, sousFamille);
  }  

}
