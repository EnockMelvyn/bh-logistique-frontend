import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiServerUrl = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/articles`);
  }

  public getArticleByCode(codeArticle: string ): Observable<Article[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/articles?codeArticle=`+codeArticle);
  }
  
  public getArticleByLibelle(libelleArticle: string ): Observable<Article[]> {
    return this.http.get<any>(`${this.apiServerUrl}/api/articles?libelleArticle=`+libelleArticle);
  }

  public getArticleById(idArticle: number ) : Observable<Article> {
    return this.http.get<any>(`${this.apiServerUrl}/api/articles/`+ idArticle);
  }  

  public createArticle(article: Article ) : Observable<Article> {
    return this.http.post<any>(`${this.apiServerUrl}/api/articles/`, article);
  }  

  public updateArticle(idArticle: number, article:Article ) : Observable <Article> {
    return this.http.put<any>(`${this.apiServerUrl}/api/articles/`+idArticle, article);
  } 

}
