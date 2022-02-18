import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article';
import { Commande } from 'src/app/models/commande';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Livraison } from 'src/app/models/livraison';
import { LivraisonDetail } from 'src/app/models/livraison-detail';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { LivraisonService } from 'src/app/services/livraison.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-bl-form',
  templateUrl: './bl-form.component.html',
  styleUrls: ['./bl-form.component.css']
})
export class BlFormComponent implements OnInit{

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatTable) table : MatTable<any>;
  // colonnes= ["Ref", "Entrée", "Prix Unitaire", "Montant Total"];
  colonnes= ["article", "quantite","prixUnitaire", "total"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  formBl: FormGroup;
  file: File;
  
  arrayBuffer: any;
  commandesValide : Commande[] = []
  livraison : Livraison = {}
  tabLivDet: LivraisonDetail[] = []
  livraisonDetails: LivraisonDetail[] = []

  articles: Article[] = []
  fournisseurs : Fournisseur[]=[]
  constructor( private fournisseurService: FournisseurService, private articleService: ArticleService, 
    private livraisonService: LivraisonService, private commandeService:CommandeService, private formBuilder: FormBuilder) { 
    this.formBl = this.formBuilder.group({
      fournisseur: ['', Validators.required],
      dateLivraison: ['', Validators.required],
      numeroBl: ['', Validators.required],
      commande: ['',Validators.required],
      isLivraisonTotal: [true, Validators.required],
      articles: []
    });
  }

  ngOnInit(): void {
    this.getAllFournisseurs()
    this.getCommandeValide()
    this.getAllArticles()
  }


  public getCommandeValide(): void {
    this.commandeService.getCommandesByStatut('VAL').subscribe(
      (response: Commande[]) => {
        this.commandesValide = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getAllFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  
  public getAllArticles(): void {
    console.log("get all article")
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getArticleFromCommande(event: any) {
    let commandeEnCours : Commande
    // commandeEnCours = this.formBl.get('commande')?.value
    commandeEnCours = event.value
    commandeEnCours.commandeDetails?.forEach(element =>
      {
        let livDet : LivraisonDetail = {
          "article": element.article, 
          "quantite": element.quantite!,
          "prixUnitaire": 0
        }
        this.livraisonDetails.push(livDet)
      })

      this.dataSource= new MatTableDataSource(this.livraisonDetails)
      this.dataSource.paginator = this.paginator
      
  }

  public updatePU(index:any, event:any) {
    let qte : number = event.target.value
    this.livraisonDetails[index].prixUnitaire=qte
    this.dataSource= new MatTableDataSource(this.livraisonDetails)
  }
  onFileChange (event: any) {
    try {
      if (event.target.files.length >0){
        console.log("file 1")
        this.file = event.target.files[0];
        this.formBl.patchValue({
          articles: this.file
        });
        this.formBl.get('articles')?.updateValueAndValidity()
      }
    } catch (error){
      alert(error);
    }
  }
  
  onImport(){
    console.log("on import demarre")
    const reader = new FileReader();
    this.file = this.formBl.get('articles')?.value;
    console.log(this.file)
    
    reader.onload = (event) => {
      this.arrayBuffer = reader.result;
      const workBook = xlsx.read(this.arrayBuffer, { type: 'binary'}); 
      const sheetName = workBook.SheetNames[0]
      const worksheet = workBook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {raw : true})
      console.log(jsonData)
      this.dataSource= new MatTableDataSource(jsonData)
      this.dataSource.paginator = this.paginator
      this.tabLivDet = this.dataSource.data
    }
    reader.readAsBinaryString(this.file)
  
    console.log(" 1111111")
    console.log(this.file)
    console.log("22222222")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public creationObjetLivraison(): void{
    for (var val of this.dataSource.data){
      for (var val2 of this.articles){
        if (val["Ref"]== val2.libelleArticle && val["Entrée"]>0 && val["Prix Unitaire"]){
          console.log(val2.codeArticle+"OK")
          let livDet : LivraisonDetail = {
            "article": val2, 
            "quantite": val["Entrée"],
            "prixUnitaire": val["Prix Unitaire"]
          }
          console.log(livDet)
          this.livraisonDetails.push(livDet)
          console.log(this.livraisonDetails)
        }
      }
    }
  let commandeEnCours : Commande = this.formBl.get('commande')?.value
  commandeEnCours.livraisonTotal = this.formBl.get('isLivraisonTotal')?.value
  console.log (commandeEnCours)
  //  if (this.formBl.valid) {
     this.livraison = {
      "dateLivraison": this.formBl.get('dateLivraison')?.value,
      "fournisseur": this.formBl.get('fournisseur')?.value,
      "numeroBl": this.formBl.get('numeroBl')?.value,
      "commande": commandeEnCours,
      "livraisonDetails": this.livraisonDetails
    // }
   }
  //  console.log(this.livraison.dateLivraison)
  //  console.log(this.livraison.fournisseur)
  //  console.log(this.livraison.commande)
   console.log("livraison details2");
   console.log(this.livraison.livraisonDetails)

  }

  public createLivraison(): void {
    if (this.formBl.valid){
      this.creationObjetLivraison()
      this.livraisonService.createLivraison(this.livraison).subscribe(
        (response: Livraison) => {
          this.livraison = response ;
          alert('Bon de livraison enregistré avec succès');
          this.ngOnInit()
                  
        },
        (errorResponse: HttpErrorResponse) => {
          alert(errorResponse.error.message);
        }
      )
    } else {
      alert("Remplissez tous les champs du formulaire")
    }
  }
}
