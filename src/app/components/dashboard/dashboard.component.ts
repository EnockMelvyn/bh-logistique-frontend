import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { DashboardDemande } from 'src/app/models/dashboard-demande';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { Status } from 'src/app/models/status';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DemandeDirectionService } from 'src/app/services/demande-direction.service';
import { DemandeService } from 'src/app/services/demande.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jourj : Date = new Date()
  dashboardDemandes : DashboardDemande []=[]
  dashboardDemandesDirection : any []=[]
  delaiMoyenTraitement= {nombre: 0 , moyenne : 0}
  valeurStock : number = 0
  statuts = [
    {"libelle":"Traitée", "code": "TRAITEE"},
    {"libelle":"Validé", "code": "VAL"},
    {"libelle":"Transmis à la DMG", "code": "DMG"},
    {"libelle":"En attente","code": "ATT"}
  ]

  // demandesDirectionMoisEnCours: DemandeDirection [] = []
  constructor(private dashboardService: DashboardService, private authService: AuthService, private demandeService: DemandeService,
    private demandeDirectionService : DemandeDirectionService, private articleService : ArticleService,
    private router: Router) { }

  ngOnInit(): void {
    this.demandeDashboard()
    this.demandeDirectionMoisEnCours()
    this.calculDelaiMoyTraitement()
    this.getValeurStock()
  }

  public getValeurStock(): void {
    this.articleService.getAllArticles().subscribe(
      (response: Article[]) => {
        
        response.forEach(article => {
          this.valeurStock = this.valeurStock+ (article.cmup!*article.quantiteStock!)
        })
        console.log("Valeur du stock: "+this.valeurStock)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public demandeDashboard():void {
    this.dashboardService.getDashboardDemande(this.authService.userConnected().emailUser!).subscribe(
      (response : DashboardDemande[]) => { 
        this.dashboardDemandes = response
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  demandeDirectionMoisEnCours(): void {
    let debut= new Date()
    let fin= new Date()
    debut.setDate(1)
    fin.setMonth(fin.getMonth()+1,0)
    let periode = {'debut':debut, 'fin': fin}
    console.log(periode)
    this.demandeDirectionService.getDemandeDirByDateDemandeBetween(periode).subscribe(
      (response: DemandeDirection[])=>{
        console.log("Demandes de la période :")
        console.log(response )
        for(let statut of this.statuts) {
          let ligne = {'statut': statut, 'nombre': 0}
          let nbre =0
          console.log(statut.libelle)
          for(let demandeDir of response){
            if(demandeDir.status?.codeStatut == statut.code){
              nbre = nbre+1
            }
            ligne.nombre = nbre
            
          }
          this.dashboardDemandesDirection.push(ligne)
        }
        console.log("this.dashboardDemandesDirection ")
        console.log(this.dashboardDemandesDirection )
      }
    )
  }

  calculDelaiMoyTraitement(){
    let debut= new Date()
    let fin= new Date()
    debut.setDate(1)
    fin.setMonth(fin.getMonth()+1,0)
    // Retour au mois passé
    // debut.setMonth(debut.getMonth()-1,1)
    // fin.setMonth(fin.getMonth(),0)
    let periode = {'debut':debut, 'fin': fin}
    this.demandeDirectionService.getDemandeDirByDateDemandeBetween(periode).subscribe(
      (response: DemandeDirection[])=>{
        // console.log(response )
        let delaiTotal=0
        let demandeTraitee =0
          for(let demandeDir of response){            
            if(demandeDir.status?.codeStatut == "TRAITEE"){
              let dateTraitement = new Date(demandeDir.modifiedAt!)
              let dateCreation = new Date(demandeDir.dateDemande!)
              let diffInMs = dateTraitement.valueOf()! - dateCreation.valueOf()!
              console.log(diffInMs)
              let diffDays = Math.ceil(diffInMs/(1000*60*60*24))
              console.log("delai de traitement de la demande: "+diffDays)
              delaiTotal = delaiTotal+diffDays
              demandeTraitee++
            }
          }
          // console.log("delai de traitement de toutes les demandes du mois: "+delaiTotal)
          // console.log("delai moyen de traitement de toutes les demandes du mois: "+ (delaiTotal/demandeTraitee))
          this.delaiMoyenTraitement.nombre = demandeTraitee
          this.delaiMoyenTraitement.moyenne = delaiTotal/demandeTraitee
        }
    )
  }

  public goToDetailDemandeDashboard( demandeDashboard: DashboardDemande): void {
    console.log(demandeDashboard)
    this.demandeService.page_code.forEach(element => {
      if (demandeDashboard.statut === element.libelle ){
        // this.router.navigateByUrl("/content/demande/list/"+element.page)
        this.router.navigateByUrl("/content/demande/mesDemandes")
      }
    });
  }
}
