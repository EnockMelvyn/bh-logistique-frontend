import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class MouvStockService {

  private apiGetInfosAppli = environment.apiBaseUrl+'/api/mouvementStock'

  constructor(private http: HttpClient) { }

  public getAllMouvements(): Observable<any>{
    return this.http.get<any>(this.apiGetInfosAppli)
  }
  
  public getAllMouvementByArticle(idArticle : number): Observable<any>{
    return this.http.get<any>(this.apiGetInfosAppli+'?idArticle='+idArticle)
  }

}
