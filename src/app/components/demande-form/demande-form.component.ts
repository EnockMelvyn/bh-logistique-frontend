import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Demande } from 'src/app/models/demande';
import { DemandeArticle } from 'src/app/models/demandeArticle';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: '',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<DemandeArticle>;

  public idDemande = 0 

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public articles : Article[]=[]

  public statutDemande: any[]= [
    { 
      "texte": "En attente",
      "valeur": "EN_ATTENTE"
    },
    { 
      "texte": "Validé",
      "valeur": "VALIDEE"
    },
    { 
      "texte": "Refusé",
      "valeur": "REFUSEE"
    }
  ]
  // Elements formulaire ajout Produit
  columnsToDisplay = ['article','quantite','action']
  
  public idType : number
  public idArticleToAdd = 0
  public quantite = 0
  public dateDem: Date
  // public article?: Article;
  private articleToAdd?: Article

  private demandeArticle?: DemandeArticle 

  public mustJustify: boolean = false

  public demande : Demande = {}
  // { numRef: '', estimation:0, observation:'',
  //  dateDemande: new Date,idDemande:0, demandeur:'', statutDemande:'', urgent:false,
  //  justifUrgence:'', demandeArticles:[], createdAt: new Date, createdBy:'',modifiedAt: new Date, modifiedBy:''};


  constructor( private demandeService : DemandeService, private articleService: ArticleService, 
    // @Inject(MAT_DIALOG_DATA) public data: {idDemande: number}, 
    private data : DataService, private route : ActivatedRoute,
    private router: Router, private _formBuilder: FormBuilder,
    private authService: AuthService) { 
     

      if (this.data.getDemande() )
    {
      this.demande = this.data.getDemande() 
    }
      this.firstFormGroup = this._formBuilder.group({
        numRef: [this.demande.numRef, Validators.required],
        categorie: [this.demande.idCategorie, Validators.required],
        estimation: [this.demande.estimation, Validators.required],
        observation: [this.demande.observation],
        // dateDemande: [new Date(), Validators.required],
        // demandeur: ['', Validators.required],
        statutDemande: ['EN_ATTENTE'],
        urgent: [''],
        justifUrgence: ['']
    });
    

      this.secondFormGroup = this._formBuilder.group({
        article: ['', Validators.required],
        quantite: ['', Validators.required],
      });
  
    }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.idType = params.idType
      }
      )
    this.dateDem = new Date()
    console.log(this.idType)
    // if()
    // if (this.data.idDemande != null) {
    //   this.getDemande()
    //   this.idDemande= this.data.idDemande
    // }
    
    // if (this.data.getDemande() )
    // {
    //   this.demande = this.data.getDemande() 
    // }

    console.log(this.demande)
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.articles)
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  public createDemande(): void {
    let demande= this.buildDemande()
    console.log("user connected => "+ this.authService.userConnected().emailUser)
    console.log(demande)
    this.demandeService.createDemande2(demande).subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande enregistrée');
        console.log(this.demande)
        window.close()
      },
      (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.error.message);
      }
      )
  }

  public OnChecked(target: any){
    this.mustJustify = !this.mustJustify;
    console.log("mustJustify => "+ this.mustJustify)
  }

  public getDemande(): void {
    this.demandeService.getDemandeById(this.demande.idDemande!).subscribe(
      (response: Demande) => {
        this.demande = response ;
        console.log(this.demande)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


  public updateDemande(): void {
    let demande= this.buildDemande()
    this.demandeService.updateDemande(this.demande.idDemande!, demande).subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande mise à jour');
        console.log(this.demande)
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public buildDemande(): Demande {
    let demande : Demande
    demande= {
      numRef: this.firstFormGroup.get('numRef')!.value,
      estimation: this.firstFormGroup.get('estimation')!.value,
      observation: this.firstFormGroup.get('observation')!.value,
      // dateDemande: this.firstFormGroup.get('dateDemande')!.value,
      demandeur: this.authService.userConnected().emailUser,
      statutDemande: 'EN_ATTENTE',
      idType: this.idType,
      urgent: this.firstFormGroup.get('urgent')!.value,
      justifUrgence: this.firstFormGroup.get('justifUrgence')!.value,
      demandeArticles: this.demande.demandeArticles
    }

    return demande;
  }
  public validateDemande(): void {
    this.demandeService.validateOrRefuseDemande(this.demande.idDemande!, "validate").subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande mise à jour');
        console.log(this.demande)
        // this.router.navigateByUrl('/demande')
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }
  public refuseDemande(): void {
    this.demandeService.validateOrRefuseDemande(this.demande.idDemande!, "refuse").subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande mise à jour');
        console.log(this.demande)
        // this.router.navigateByUrl('/demande')
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public addDemandeArticle():void {

    console.log(this.idArticleToAdd)
    this.demandeArticle= {idArticle: this.idArticleToAdd, 
    quantite: this.quantite}
    this.demande.demandeArticles?.push(this.demandeArticle)
    this.demande.demandeArticles?.sort
    this.demandeArticle={}
    this.table.renderRows()
    // this.articleService.getArticleById(this.idArticleToAdd).subscribe(
    //   (response: Article) => {
    //     this.articleToAdd = response ;
    //     console.log('-------------------------------------------------------')
    //     console.log('Article to add'+this.articleToAdd)
    //     console.log('-------------------------------------------------------')
    //     this.demandeArticle = {article: this.articleToAdd, quantite: this.quantite}
    //     console.log('demandeArticle 1 = ' + this.demandeArticle)
    //     console.log('demandeArticle lib = ' + this.demandeArticle.article?.libelleArticle)
    //     this.demande.demandeArticles!.push(this.demandeArticle);
    //     this.demande.demandeArticles!.sort
    //     console.log(this.demande.demandeArticles)
    //     // nettoyage demandeArticle
    //     this.demandeArticle={}
    //     console.log('demandeArticle 2 = ' + this.demandeArticle)  
    //     this.table.renderRows()
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // )
  }

  public deleteDemandeArticle(ligne: DemandeArticle):void {

    const index = this.demande.demandeArticles!.findIndex(demandeArticle => demandeArticle = ligne);
    this.demande.demandeArticles!.splice(index,1)
        this.demande.demandeArticles!.sort
        this.table.renderRows()
        console.log(this.demande.demandeArticles)
    
  }

  public annulerDemande():void {
    this.demande = {}
    this.data.setDemande(this.demande)
    this.router.navigateByUrl("/content/demande/list")
  }
}
