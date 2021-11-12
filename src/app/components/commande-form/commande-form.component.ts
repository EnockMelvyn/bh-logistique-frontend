import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article';
import { Commande } from 'src/app/models/commande';
import { CommandeDetail } from 'src/app/models/commande-detail';
import { Fournisseur } from 'src/app/models/fournisseur';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { DataService } from 'src/app/services/data.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';

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
  colonnes = ["article", "CMUP", "quantite","actions"];
  articles : Article[] = [];
  fournisseurs: Fournisseur[] = []
  commandeDetails : CommandeDetail[] = []
  selectedComDet : CommandeDetail = {}
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  formCommande : FormGroup 
  constructor(private formBuilder : FormBuilder, private articleService: ArticleService,
    private commandeService : CommandeService, private fournisseurService: FournisseurService, private dataService: DataService) { 

   }

  ngOnInit(): void {

    if (this.dataService.getCommande().commandeDetails) {
      this.commande = this.dataService.getCommande()
      this.commandeDetails = this.commande.commandeDetails! 
    } 
    console.log(this.dataService.getCommande()) 
    console.log(this.commandeDetails) 
    this.dataSource.data = this.commandeDetails
    this.getAllArticles()
    this.getAllFournisseur() 
    this.formCommande = this.formBuilder.group({
      numCommande : [this.commande.numeroCommande, Validators.required],
      dateCommande : [this.commande.dateCommande, Validators.required],
      fournisseur : [this.commande?.fournisseur,Validators.required],
      article:[],
      quantite:[]
    })
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

  public getAllFournisseur(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  addArticle(): void {
    let commandeDet: CommandeDetail 
    commandeDet = {article: this.formCommande.get('article')?.value, quantite: this.formCommande.get('quantite')?.value}
    let add = false
    if(this.commandeDetails?.length>0){
      this.commandeDetails.forEach((el, index, array) => {
        if(el.article?.idArticle === commandeDet.article?.idArticle) {
          el.quantite = el.quantite! + commandeDet.quantite!
          add =true
        }
      })
       
      if (add=== false){
        this.commandeDetails.push(commandeDet)
      }
    } else {
      this.commandeDetails.push(commandeDet)
    }
    

    this.dataSource.data = this.commandeDetails
    this.table.renderRows()

    console.log(this.dataSource.data)
  }

  supprimerComDet(ind : any): void {
      this.commandeDetails?.forEach((el, index, array) => {
        if(index === ind) {
          array.splice(index,1)
        }
      })
      this.dataSource.data = this.commandeDetails
  }

  public createCommande(): void {
    if(!this.formCommande.get('dateCommande')?.valid){
      this.dateCommInvalid = true
    } else {
    this.commande= {
      dateCommande: this.formCommande.get('dateCommande')?.value,
      numeroCommande: this.formCommande.get('numCommande')?.value,
      fournisseur: this.formCommande.get('fournisseur')?.value,
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
    
  }
  this.resetPage()
  }
  public updateCommande(): void {
    console.log(this.commande.idCommande)
    let id = this.commande.idCommande
    if(!this.formCommande.get('dateCommande')?.valid){
      this.dateCommInvalid = true
    } else {
    this.commande= {
      idCommande: id,
      dateCommande: this.formCommande.get('dateCommande')?.value,
      numeroCommande: this.formCommande.get('numCommande')?.value,
      fournisseur: this.formCommande.get('fournisseur')?.value,
      commandeDetails: this.commandeDetails
    }
    console.log(this.commande)
    this.commandeService.updateCommande(this.commande).subscribe(
      (response: Commande) => {
        this.commande = response ;
        alert('Bon de commande mis à jour');
        this.ngOnInit()
                // window.close()
      },
      (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.error.message);
      }
    )
    
  }
  this.resetPage()
  }

  resetPage(): void {
    this.commande = {}
    this.dataService.setCommande(this.commande)
    this.commandeDetails = []
    this.dataSource.data = []
    this.formCommande.setValue({
      numCommande : '',
      dateCommande: '',
      fournisseur: '',
      article: {},
      quantite: 0
    })
  }
  
}
