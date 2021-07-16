import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '../models/article';
import { SousFamille } from '../models/sousFamille';
import { ArticleService } from '../services/article.service';
import { sousFamilleService } from '../services/sousFamille.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  public idArticle=-1

  public sousFamilles: SousFamille[]=[]

  public article : Article = { idArticle:0, libelleArticle:'',codeArticle:'', sousFamille: null};
  
    constructor(private articleService : ArticleService , private sousFamilleService : sousFamilleService, @Inject(MAT_DIALOG_DATA) public data: {idArticle: number}) { }
  
    ngOnInit(): void {
      console.log(this.idArticle)
      this.getAllSousFamilles()
      console.log(this.sousFamilles)
      if (this.data.idArticle != null) {
        this.getArticle() 
        this.idArticle= this.data.idArticle
      }
      
    }
  
    onSubmit(form: NgForm) {
      console.log(form.value);
    }
    public createArticle(): void {
      this.articleService.createArticle(this.article).subscribe(
        (response: Article) => {
          this.article = response ;
          alert('Article ajoutée avec succès');
          console.log(this.article)
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  
    public getArticle(): void {
      this.articleService.getArticleById(this.data.idArticle).subscribe(
        (response: Article) => {
          this.article = response ;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  
  
    public updateArticle(): void {
      this.articleService.updateArticle(this.data.idArticle, this.article).subscribe(
        (response: Article) => {
          this.article = response ;
          alert('Article mise à jour');
          console.log(this.article)
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }

    public getAllSousFamilles(): void {
      this.sousFamilleService.getAllSousFamilles().subscribe(
        (response: SousFamille[]) => {
          this.sousFamilles = response ;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
}
