import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleFormComponent } from '../article-form/article-form.component';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  
  articles: Article[] = [];

  columnsToDisplay = ['libelleArticle','codeArticle', 'sousFamille']

  constructor(private articleService: ArticleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  public getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  openDialogUpdateArticle(row:Article): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
      data: {idArticle: row.idArticle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

  openDialogCreateArticle(): void {
    const dialogRef = this.dialog.open(ArticleFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }
}
