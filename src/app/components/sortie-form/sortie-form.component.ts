import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article';
import { Demande } from 'src/app/models/demande';
import { Sortie } from 'src/app/models/sortie';
import { ArticleService } from 'src/app/services/article.service';
import { DemandeService } from 'src/app/services/demande.service';
import { SortieService } from 'src/app/services/sortie.service';

@Component({
  selector: 'app-sortie-form',
  templateUrl: './sortie-form.component.html',
  styleUrls: ['./sortie-form.component.css']
})
export class SortieFormComponent implements OnInit {

  idSortie :number =-1
  // sortie : Sortie
  formSortie: FormGroup
  articles: Article[] = []
  demandes : Demande [] = []
  constructor(private formBuilder: FormBuilder, private sortieService: SortieService, 
    private articleService: ArticleService, private demandeService: DemandeService) { 
    this.formSortie = this.formBuilder.group({
      dateSortie : ['',Validators.required],
      reference : ['',Validators.required],
      article : [{},Validators.required],
      demande : [{},Validators.required],
      quantite: [0, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllArticles()
    this.getDemandesEnAttente()
  }

  public enregistrerSortie():void {
    console.log(this.formSortie.value.dateSortie)
    var sortie : Sortie = { 
      dateSortie: this.formSortie.value.dateSortie,
      reference: this.formSortie.value.reference,
      demande: this.formSortie.value.demande,
      article: this.formSortie.value.article,
      quantite: this.formSortie.value.quantite
    }
    this.sortieService.createSortie(sortie).subscribe(
      (response: Sortie) => {
        sortie = response ;
        alert('Sortie enregistrée');
        console.log(sortie)
        this.ngOnInit()
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
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

  public getDemandesEnAttente(): void {
    this.demandeService.getDemandeByStatut("EN_ATTENTE").subscribe(
      (response: Demande[]) => {
        this.demandes = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
