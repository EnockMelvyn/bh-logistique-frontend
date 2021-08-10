import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MouvementStockService } from '../services/mouvement-stock.service';
import * as xlsx from 'xlsx';
import { MouvementStock } from '../models/mouvement-stock';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enregistrement-bl',
  templateUrl: './enregistrement-bl.component.html',
  styleUrls: ['./enregistrement-bl.component.css']
})
export class EnregistrementBLComponent implements OnInit {
  // colonnes= ["Article", "Ref", "Stock Initial", "Entrées","Sortie","Stock Final","P.U"];
  // colonnes= ["Date", "Ref", "Quantité", "Sortie", "BL n°","BC n°","Marque","Fournisseur","Direction / Agence","Demandeur","Prix Unitaire","Montant Total"];
  colonnes= ["Ref", "Quantité", "Prix unitaire"];

  articles: Article[] = []
  dataSource: any;
  formUpload: FormGroup;
  file: File;

  lignesMouv: LigneMouvementStock[] = []
  mouvements: MouvementStock[]= []
  
  arrayBuffer: any;

  filename =''
  constructor(private mouvementStockService: MouvementStockService, private formBuilder: FormBuilder, private articleService:ArticleService) { 
    this.formUpload = this.formBuilder.group({
      fileUpload: []
    })
  }

  ngOnInit(): void {
    this.getAllArticles()
  }

  onFileChange (event: any) {
    try {
      if (event.target.files.length >0){
        console.log("file 1")
        this.file = event.target.files[0];
        this.formUpload.patchValue({
          fileUpload: this.file
        });
        this.formUpload.get('fileUpload')?.updateValueAndValidity()
      }
    } catch (error){
      alert(error);
    }
  }

  onImport(){
    console.log("on import demarre")
    const reader = new FileReader();
    this.file = this.formUpload.get('fileUpload')?.value;
    console.log(this.file)
    
    reader.onload = (event) => {
      console.log("rentrer dans le reader")
      this.arrayBuffer = reader.result;
      const workBook = xlsx.read(this.arrayBuffer, { type: 'binary'}); 
      const sheetName = workBook.SheetNames[0]
      const worksheet = workBook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {raw : false, dateNF: "dd/mm/yyyy"})
      // console.log(jsonData)
      // console.log(JSON.stringify(jsonData))
      
      this.dataSource= new MatTableDataSource(jsonData)
      this.lignesMouv=this.dataSource.data
      // console.log(this.mouvements[0]["Direction / Agence"])
      console.log (this.lignesMouv)
    }
    reader.readAsBinaryString(this.file)
  
  }

  public uploadFile() {
    var message 
    this.creationTableauMouvement(this.lignesMouv)
    this.mouvementStockService.createMouvementStock(this.mouvements).subscribe(
      (response => {
        alert(response)
      }),
      (error => {
        alert(error.message)
      }
    )) 
    this.ngOnInit()
  }

  public creationTableauMouvement(tableau : LigneMouvementStock[]):void{
    for (var ligne of tableau){
      this.mouvements.push({article: this.articles.find(element => element.libelleArticle== ligne.Ref),
        entree: ligne.Entrée,
        sortie: ligne.Sortie,
        dateMouvement: new Date(ligne.Date),
        demandeur: ligne.Demandeur,
        prixUnitaire: ligne['Prix Unitaire']
      })
    }
    console.log(this.mouvements)
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
}



export interface LigneMouvementStock {
  "Date": string;
  "Ref": string;
  article?: String;
  "Entrée"?:number;
  "Sortie"?:number;
  "Fournisseur"?: string;
  "Prix Unitaire"?: number;
  "Demandeur"?: string;
  
}
