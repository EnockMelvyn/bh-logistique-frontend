import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { MouvStock } from 'src/app/models/mouv-stock';
import { SousFamille } from 'src/app/models/sousFamille';
import { ArticleService } from 'src/app/services/article.service';
import { DataService } from 'src/app/services/data.service';
import { MouvStockService } from 'src/app/services/mouv-stock.service';
import { sousFamilleService } from 'src/app/services/sousFamille.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  public idArticle = -1
  public sousFamilles: SousFamille[]=[]

  public article : Article = {};

  public formArticle: FormGroup;

  dataSource : MatTableDataSource<MouvStock> = new MatTableDataSource<MouvStock>()
  columnsToDisplay = ['dateMouvement','article','prixUnitaire','typeMouvement','qteAvant', 'qteMouvement','qteApres', 'username']
  
  @ViewChild(MatSort) sort !: MatSort;
    constructor(private articleService: ArticleService, private sousFamilleService : sousFamilleService, 
      private formBuilder: FormBuilder, private mouvStockService : MouvStockService, public dataService : DataService, private router : Router
      ) {
        this.formArticle = formBuilder.group({
          libelleArticle: ['',Validators.required],
          codeArticle: ['', Validators.required],
          sousFamille: [{}, Validators.required]
        })
       }
  
    ngOnInit(): void {      
      this.getAllSousFamilles()
      this.article = this.dataService.getArticle()
      this.initForm()

      this.getAllArticleMouvement()
    }
  
    public initForm():void {
  
      let art = {
        libelleArticle: this.article.libelleArticle ? this.article.libelleArticle:'',
        codeArticle: this.article.codeArticle ? this.article.codeArticle:'',
        sousFamille: this.article.sousFamille ? this.article.sousFamille:{}
      }
      this.formArticle.patchValue(art)
    }

    public createObjectArticle(): void {
      const formValue = this.formArticle.value
      this.article = {
        libelleArticle: formValue["libelleArticle"],
        codeArticle: formValue["codeArticle"],
        sousFamille: formValue["sousFamille"]
      }
      console.log(this.formArticle.value)
    }

    // onSubmit(form: NgForm) {
    //   console.log(form.value);
    // }

    public createArticle(): void {
      this.createObjectArticle()
      this.articleService.createArticle(this.article).subscribe(
        (response: Article) => {
          alert('Article ajoutée avec succès');
          this.article = {}
          this.dataService.setArticle(this.article)
          this.router.navigateByUrl("/content/article/list")
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  
    public updateArticle(): void {
      this.createObjectArticle()
      this.articleService.updateArticle(this.article?.idArticle!, this.article).subscribe(
        (response: Article) => {
          this.article = response ;
          alert('Article mis à jour');
          this.article = {}
          this.dataService.setArticle(this.article)
          this.router.navigateByUrl("/content/article/list")
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

    public getAllArticleMouvement() : void {
      if (this.article?.idArticle!) {
        this.mouvStockService.getAllMouvementByArticle(this.article?.idArticle!).subscribe(
          (response : MouvStock[])=> {
            console.log(response)
            if(response!=null && response.length>0){
              this.dataSource.data = response
              this.dataSource.sort = this.sort
            }
          },
          (errorResponse : HttpErrorResponse) => {
            console.log(errorResponse.error.message)
          }
        )
      }
    }
}

