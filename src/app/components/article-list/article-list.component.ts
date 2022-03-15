import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  articles: Article[] = [];
  modifArticle = true
  dataSource : MatTableDataSource<Article> = new MatTableDataSource()
  columnsToDisplay = ['libelleArticle','codeArticle', 'sousFamille', 'cmup', 'quantiteStock','actions']
  // columnsToDisplay:string[] =['libelleArticle','codeArticle', 'sousFamille']
  loading = false
  constructor(private articleService: ArticleService, public router : Router, public dataService: DataService) { }

  ngOnInit(): void {
    // this.setModif()
    this.getAllArticles();
  }

  public getAllArticles(): void {
    this.loading = true
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.loading = false
        this.articles = response ;
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        alert(error.message);
      }
    )
  }

    updateArticle(row:Article) {
    this.dataService.setArticle(row) 
    this.router.navigateByUrl("/content/article/creer")
    
  }

  createArticle() {
    this.dataService.setArticle({}) 
    this.router.navigateByUrl("/content/article/creer")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // setModif(){
  //   console.log(this.dataService.userConnected)
  //   if (this.dataService.userConnected.profileRole?.includes('DMG')){
  //     console.log("L'utilisateur est un admin")
  //   }

  //   if (this.dataService.userConnected.profileRole?.includes('DMG') ||
  //   this.dataService.userConnected.profileRole?.includes('ECO') ||
  //   this.dataService.userConnected.profileRole?.includes('ADMIN')) {
  //     this.modifArticle = true
  //     this.columnsToDisplay = ['libelleArticle','codeArticle', 'sousFamille', 'cmup', 'quantiteStock','actions']
  //   }
  // }
}
