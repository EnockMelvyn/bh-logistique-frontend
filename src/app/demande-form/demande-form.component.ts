import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from '../models/article';
import { Demande } from '../models/demande';
import { ArticleService } from '../services/article.service';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {
  public idDemande=-1

  public articleToAdd : Article = {idArticle: 0, libelleArticle: '', codeArticle: '', sousFamille: null}


  public articles : Article[]=[]

  public demande : Demande = { numRef: '', estimation:0, observation:'',
   dateDemande: new Date,idDemande:0, demandeur:'', statutDemande:'', urgent:false,
   justifUrgence:'', articles:[], createdAt: new Date, createdBy:'',modifiedAt: new Date, modifiedBy:''};

  constructor(private demandeService : DemandeService, private articleService: ArticleService , @Inject(MAT_DIALOG_DATA) public data: {idDemande: number}) { }


  ngOnInit(): void {
    if (this.data.idDemande != null) {
      this.getDemande() 
      this.articleService.getAllArticles;
      this.idDemande= this.data.idDemande
    }
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  public createDemande(): void {
    this.demandeService.createDemande(this.demande).subscribe(
      (response: Demande) => {
        this.demande = response ;
        alert('Demande enregistrée');
        console.log(this.demande)
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public getDemande(): void {
    this.demandeService.getDemandeById(this.data.idDemande).subscribe(
      (response: Demande) => {
        this.demande = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


  public updateDemande(): void {
    this.demandeService.updateDemande(this.data.idDemande, this.demande).subscribe(
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

}
