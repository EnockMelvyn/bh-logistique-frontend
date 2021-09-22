import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article';
import { Commande } from 'src/app/models/commande';
import { CommandeDetail } from 'src/app/models/commande-detail';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.css']
})
export class CommandeFormComponent implements OnInit {
  dateCommInvalid =false
  numCommInvalid =false
  @ViewChild(MatTable) table!: MatTable<any>;
  commande : Commande = {}
  colonnes = ["article", "CMUP", "quantite"];
  articles : Article[] = [];
  commandeDetails : CommandeDetail[] = []
  dataSource: MatTableDataSource<CommandeDetail> = new MatTableDataSource();
  formCommande : FormGroup
  constructor(private formBuilder : FormBuilder, private articleService: ArticleService,
    private commandeService : CommandeService) { 

    this.formCommande = this.formBuilder.group({
      numCommande : ['', Validators.required],
      dateCommande : [Date.now, Validators.required],
      article:[],
      quantite:[]
    })
   }

  ngOnInit(): void {
    this.getAllArticles()
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

  addArticle(): void {
    let commandeDet: CommandeDetail 
    commandeDet = {article: this.formCommande.get('article')?.value, quantite: this.formCommande.get('quantite')?.value}
    this.commandeDetails.push(commandeDet)

    this.dataSource.data = this.commandeDetails

    this.table.renderRows()

    console.log(this.dataSource.data)
  }
  
  removeArticle(): void {
    this.articles.push(this.formCommande.get('article')?.value)
  }

  public createCommande(): void {
    if(!this.formCommande.get('dateCommande')?.valid){
      this.dateCommInvalid = true
    } else {
    this.commande= {
      dateCommande: this.formCommande.get('dateCommande')?.value,
      numeroCommande: this.formCommande.get('numCommande')?.value,
      commandeDetails: this.commandeDetails
    }
    console.log(this.commande)
    this.commandeService.createCommande(this.commande).subscribe(
      (response: Commande) => {
        this.commande = response ;
        alert('Bon de commande enregistré avec succès');
        this.ngOnInit()
                // window.close()
      },
      (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.error.message);
      }
    )

    this.resetPage()
  }
  }

  resetPage(): void {
    this.commande = {}
    this.commandeDetails = []
    this.dataSource.data = []
    this.formCommande.setValue({
      numCommande : '',
      dateCommande: '',
      article: {},
      quantite: 0
    })
  }
  
}
