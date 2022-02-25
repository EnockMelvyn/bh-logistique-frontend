import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardDemande } from 'src/app/models/dashboard-demande';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { Status } from 'src/app/models/status';
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

  dashboardDemandes : DashboardDemande []=[]
  dashboardDemandesDirection : any []=[]
  delaiMoyenTraitement: number = 0
  statuts = [
    {"libelle":"Traitée", "code": "TRAITEE"},
    {"libelle":"Validé", "code": "VAL"},
    {"libelle":"Transmis à la DMG", "code": "DMG"},
    {"libelle":"En attente","code": "ATT"}
  ]

  // demandesDirectionMoisEnCours: DemandeDirection [] = []
  constructor(private dashboardService: DashboardService, private authService: AuthService, private demandeService: DemandeService,
    private demandeDirectionService : DemandeDirectionService,
    private router: Router) { }

  ngOnInit(): void {
    this.demandeDashboard()
    // this.demandeDirectionMoisEnCours()
    this.calculDelaiMoyTraitement()
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
    let jour = new Date()
    let debut= new Date()
    let fin= new Date()
    debut.setDate(1)
    fin.setMonth(fin.getMonth()+1,0)
    let periode = {'debut':debut, 'fin': fin}
    this.demandeDirectionService.getDemandeDirByDateDemandeBetween(periode).subscribe(
      (response: DemandeDirection[])=>{
        console.log("Demandes de la période :")
        console.log(response )
        for(let statut of this.statuts) {
          let ligne = {'statut': 'vide', 'nombre': 0}
          let nbre =0
          for(let demandeDir of response){
            ligne.statut = statut.libelle
            console.log(statut.libelle)
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
    let periode = {'debut':debut, 'fin': fin}
    this.demandeDirectionService.getDemandeDirByDateDemandeBetween(periode).subscribe(
      (response: DemandeDirection[])=>{
        console.log("nbre de la période :"+ response.length)
        // console.log(response )
        let delaiTotal=0
          for(let demandeDir of response){            
            if(demandeDir.status?.codeStatut == "TRAITEE"){
              let diffInMs = demandeDir.modifiedAt?.valueOf()! - demandeDir.createdAt?.valueOf()!
              console.log(demandeDir.modifiedAt?.valueOf()!)
              let diffDays = Math.ceil(diffInMs/(1000*60*60*24))
              console.log("delai de traitement de la demande: "+diffDays)
              delaiTotal = delaiTotal+diffDays
            }
          }
          console.log("delai de traitement de toutes les demandes du mois: "+delaiTotal)
          console.log("delai moyen de traitement de toutes les demandes du mois: "+delaiTotal/response.length)
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
