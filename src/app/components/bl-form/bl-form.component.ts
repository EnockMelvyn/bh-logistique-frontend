import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/app/models/article';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Livraison } from 'src/app/models/livraison';
import { LivraisonDetail } from 'src/app/models/livraison-detail';
import { ArticleService } from 'src/app/services/article.service';
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
  colonnes= ["Ref", "Entrée", "Prix Unitaire"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  formBl: FormGroup;
  file: File;
  
  arrayBuffer: any;

  livraison : Livraison = {}
  tabLivDet: LivraisonDetail[] = []
  livraisonDetails: LivraisonDetail[] = []

  articles: Article[] = []
  fournisseurs : Fournisseur[]=[]
  constructor( private fournisseurService: FournisseurService, private articleService: ArticleService, 
    private livraisonService: LivraisonService, private formBuilder: FormBuilder) { 
    this.formBl = this.formBuilder.group({
      fournisseur: ['', Validators.required],
      dateLivraison: ['', Validators.required],
      numeroBl: ['', Validators.required],
      articles: []
    });
  }

  ngOnInit(): void {
    this.getAllFournisseurs()
    this.getAllArticles()
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
        if (val["Ref"]== val2.codeArticle){
          this.livraisonDetails.push({"article": val2, "quantite": val["Entrée"],"prix_unitaire": val["Prix Unitaire"]})
        }
      }
    }

   if (this.formBl.valid) {
     this.livraison = {
      "dateLivraison": this.formBl.get('dateLivraison')?.value,
      "fournisseur": this.formBl.get('fournisseur')?.value,
      "numeroBl": this.formBl.get('numeroBl')?.value,
      "livraisonDetails": this.livraisonDetails
    }
   }

   console.log(this.livraison.dateLivraison)
   console.log(this.livraison.fournisseur)
   console.log("livraison details2");
   console.log(this.livraison.livraisonDetails)

  }

  public createLivraison(): void {
    this.creationObjetLivraison()
    this.livraisonService.createLivraison(this.livraison).subscribe(
      (response: Livraison) => {
        this.livraison = response ;
        alert('Bon de livraison enregistré avec succès');
        this.ngOnInit()
                // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
