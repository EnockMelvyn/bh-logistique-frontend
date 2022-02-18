import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Inventaire } from 'src/app/models/inventaire';
import { InventaireDetail } from 'src/app/models/inventaire-detail';
import { DataService } from 'src/app/services/data.service';
import { InventaireService } from 'src/app/services/inventaire.service';

@Component({
  selector: 'app-inventaire-form',
  templateUrl: './inventaire-form.component.html',
  styleUrls: ['./inventaire-form.component.css']
})
export class InventaireFormComponent implements OnInit {


  @ViewChild(MatTable) table : MatTable<any>;
  loading = false
  inventaire : Inventaire = {}
  inventaireDetail : InventaireDetail[] = []
  formInventaire : FormGroup

  colonnes = ['article', 'qteCalcule', 'qteComptee', 'cmup', 'ecart', 'valeurEcart']
  constructor(private inventaireService: InventaireService, private formBuilder: FormBuilder, private dataService: DataService,
    private router: Router) { 
     this.inventaire = this.dataService.inventaire
     this.dataService.inventaire = {}
      
  }

  ngOnInit(): void {
    this.formInventaire = this.formBuilder.group({
      'dateInventaire': [this.inventaire.dateInventaire],
      'libelle': [this.inventaire.libelle],
      'valeurEcart': [this.inventaire.valeurEcart]
    })
    console.log(this.inventaire)
    
  }

  // fonction pour reconstituer l'objet inventaire à partir du formulaire
  creerObjet():Inventaire {
    let inventaire= this.inventaire
    inventaire.dateInventaire= this.formInventaire.get('dateInventaire')?.value,
    inventaire.libelle= this.formInventaire.get('libelle')?.value

    return inventaire;
  }

  // Fonction de génération des lignes d'article de l'inventaire
  public genererInventaire() {
    this.loading= true
    this.inventaireService.generateInventaire(this.creerObjet()).subscribe(
      (response: Inventaire) => {
        this.loading=false
        this.inventaire = response
        console.log(this.inventaire)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  // Fonction pour la maj des quantités comptées
  updateDetails(event : any, index : number) {
    this.inventaire.details ? this.inventaire.details[index].qteComptee=event.target.value : null
    console.log(this.inventaire)
    let valEcart = 0
    this.table.renderRows()
  }

  // Fonciton pour l'enregistrement en BD avant validation
  enregistrerDetails() {
    this.loading= true
    let inventaire = this.creerObjet()
    this.inventaireService.majInventaire(inventaire).subscribe(
      (response : Inventaire)=>{
        this.loading= false
        alert("Inventaire validé.") 
        this.inventaire = response
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  // fonction de validation de l'inventaire
  validerInventaire() {
    if (confirm("Voulez-vous valider l'inventaire ? Cette action modifiera les quantités des articles.")) {
    this.loading= true
    let inventaire = this.creerObjet()
    console.log("Validation de l'inventaire")
    console.log(inventaire)
    this.inventaireService.validerInventaire(inventaire).subscribe(
      (response : Inventaire)=>{
        this.loading= false
        alert("Inventaire validé.")
        this.inventaire = {}
        this.ngOnInit()
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    ) } 
  }
}
