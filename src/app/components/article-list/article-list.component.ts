import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { DataService } from 'src/app/services/data.service';
import { ArticleFormComponent } from '../article-form/article-form.component';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  
  articles: Article[] = [];

  columnsToDisplay = ['libelleArticle','codeArticle', 'sousFamille', 'cmup', 'quantiteStock','actions']

  constructor(private articleService: ArticleService, public dialog: MatDialog, public router : Router, public dataService: DataService) { }

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

  
  // openDialogUpdateArticle(row:Article): void {
  //   const dialogRef = this.dialog.open(ArticleFormComponent, {
  //     data: {article: row}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.ngOnInit()
  //   });
  // }
  updateArticle(row:Article) {
    this.dataService.setArticle(row) 
    this.router.navigateByUrl("/content/article/creer")
    // this.dataService.setArticle(row) 
    
  }

  createArticle() {
    this.dataService.setArticle({}) 
    this.router.navigateByUrl("/content/article/creer")
    
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
