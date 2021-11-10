import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  //  idDemande: number

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public articles : Article[]=[]

  // public statutDemande: any[]= [
  //   { 
  //     "texte": "En attente",
  //     "valeur": "EN_ATTENTE"
  //   },
  //   { 
  //     "texte": "Validé",
  //     "valeur": "VALIDEE"
  //   },
  //   { 
  //     "texte": "Refusé",
  //     "valeur": "REFUSEE"
  //   }
  // ]
  // Elements formulaire ajout Produit
  columnsToDisplay = ['article','quantite','action']
  
  public idType : number
  public idArticleToAdd = 0
  public quantite = 0
  public dateDem: Date
   articleToAdd?: Article

  private demandeArticle?: DemandeArticle 

  public mustJustify: boolean = false

  public demande : Demande = {}


  constructor( private demandeService : DemandeService, private articleService: ArticleService, 
    // @Inject(MAT_DIALOG_DATA) public data: {idDemande: number}, 
    private data : DataService, private route : ActivatedRoute,
    private router: Router, private _formBuilder: FormBuilder,
    private authService: AuthService) { 
     

      if (this.data.getDemande() )
    {
      this.demande = this.data.getDemande() 
      this.mustJustify = this.demande.urgent!
      this.idType = this.demande.idType!
    } 
      
     
    this.firstFormGroup = this._formBuilder.group({
      observation: [this.demande.observation],
      statutDemande: ['EN_ATTENTE'],
      urgent: [this.demande.urgent ? this.demande.urgent : false],
      justifUrgence: [this.demande.justifUrgence, this.mustJustify ? Validators.required : []]
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
    if(this.firstFormGroup.valid){
      let demande = this.buildDemande()
      console.log("user connected => "+ this.authService.userConnected().emailUser)
      console.log( demande)
      this.demandeService.createDemande2( demande).subscribe(
        (response: Demande) => {
          this.demande = response ;
          alert('Demande enregistrée. \n Référence de la demande: '+response?.numRef);
          console.log(this.demande)
          this.goToList()
        },
        (errorResponse: HttpErrorResponse) => {
          alert("ERREUR!!!!!!!!!!!!!!!!!");
          alert(errorResponse.message);
        }
        )
      } else {
        alert("Renseignez les champs obligatoires" + this.firstFormGroup.getError)
      }
  }

  public OnChecked(target: any){
    console.log(target)
    this.demande.urgent = !this.demande.urgent
    this.firstFormGroup.patchValue({urgent: target.isTrusted})
    this.mustJustify = !this.mustJustify;
    console.log("mustJustify => "+ this.mustJustify)
    this.firstFormGroup= this._formBuilder.group({
      observation: [this.demande.observation],
      statutDemande: ['EN_ATTENTE'],
      urgent: [target.isTrusted],
      justifUrgence: [this.mustJustify ? this.demande.justifUrgence : '', this.mustJustify ? Validators.required : []]
  });
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
     let demande= this.updateDemandeToSend()
     console.log(demande)
    this.demandeService.updateDemande( demande.idDemande!,demande).subscribe(
    // this.demandeService.createDemande2(this.demande).subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande mise à jour');
        console.log(this.demande)
        // window.close()
        this.goToList()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
      
  }

  public buildDemande(): Demande {
    let demande : Demande 
    if (this.firstFormGroup.valid){
    demande= {
      observation: this.firstFormGroup.get('observation')!.value,
      demandeur: this.authService.userConnected().emailUser,
      statutDemande: 'EN_ATTENTE',
      directionId: this.authService.userConnected().directionId,
      idType: this.demande.idType?this.demande.idType:this.idType,
      urgent: this.firstFormGroup.get('urgent')!.value,
      justifUrgence: this.firstFormGroup.get('justifUrgence')!.value,
      demandeArticles: this.demande.demandeArticles
    }
  } else {
    demande = {}
  }
    console.log('build terminé')
    return demande;
  }

  public updateDemandeToSend(): Demande {
    let demande:Demande = this.demande
    demande.observation = this.firstFormGroup.get('observation')?.value 
    demande.urgent = this.firstFormGroup.get('urgent')?.value
    demande.justifUrgence = this.firstFormGroup.get('justifUrgence')?.value
    demande.demandeArticles?.forEach(element => {
      element.idArticle = element.article?.idArticle
    })
    console.log("PARTIE 1 OK")
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
    if(!this.demande.demandeArticles){
      this.demande.demandeArticles = []
    }
    console.log(this.articleToAdd)
    let idArticle = this.articleToAdd ? this.articleToAdd.idArticle: undefined;
    let demandeArticleToAdd= {article: this.articleToAdd, 
    quantite: this.quantite, idArticle: idArticle}
    let add = false
    if(this.demande.demandeArticles.length>0){
      this.demande.demandeArticles.forEach((el, index, array) => {
        if(el.article?.idArticle === demandeArticleToAdd.article?.idArticle) {
          el.quantite = el.quantite! + demandeArticleToAdd.quantite
          add =true
        }
      })
       
      if (add=== false){
        this.demande.demandeArticles.push(demandeArticleToAdd)
      this.demande.demandeArticles.sort
      }
    } else {
      this.demande.demandeArticles.push(demandeArticleToAdd)
      this.demande.demandeArticles.sort
      
    }
    
    console.log(this.demande.demandeArticles)
    this.table?.renderRows()
  }

  public deleteDemandeArticle(ligne: DemandeArticle):void {

    this.demande.demandeArticles?.forEach((el, index, array) => {
      if(el.idDemandeArticle === ligne.idDemandeArticle) {
        array.splice(index,1)
      }
    })
    this.table.renderRows()
  }

  public annulerDemande():void {
    this.demande = {}
    this.data.setDemande(this.demande)
    this.router.navigateByUrl("/content/demande/list/attente")
  }

  public goToList(){
    this.data.setDemande({})
    this.router.navigateByUrl('content/demande/list/attente')
  }
}
