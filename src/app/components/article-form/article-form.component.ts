import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/models/article';
import { SousFamille } from 'src/app/models/sousFamille';
import { ArticleService } from 'src/app/services/article.service';
import { sousFamilleService } from 'src/app/services/sousFamille.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  public idArticle=-1

  public sousFamilles: SousFamille[]=[]

  public article : Article = {};
  
    constructor(private articleService: ArticleService, private sousFamilleService : sousFamilleService, 
      public dialogRef: MatDialogRef<ArticleFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {idArticle: number}) { }
  
    ngOnInit(): void {      
      this.getAllSousFamilles()
      console.log(this.sousFamilles)
      if (this.data) {
        this.getArticle() 
        this.idArticle= this.data.idArticle
      }
      console.log(this.article)
      console.log(this.idArticle)
      console.log(this.sousFamilles)
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
          this.dialogRef.close()
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
