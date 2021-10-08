import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/models/demande';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DemandeService } from 'src/app/services/demande.service';
import { DemandeFormComponent } from '../demande-form/demande-form.component';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Demande>;
  dataSource : MatTableDataSource<Demande> = new MatTableDataSource();
  demandes: Demande[] = [];

  titre = ''
  statutDemandes =''
  codeStatut =''
  columnsToDisplay = ['numRef','estimation', 'observation', 'dateDemande', 'demandeur', 'statutDemande', 'urgent', 'justifUrgence', 'actions']
        

  constructor(private demandeService: DemandeService, public dialog: MatDialog, private authService: AuthService, private router: Router,
    private data:DataService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      {
        this.statutDemandes = params.statutDemandes
        switch(this.statutDemandes){
        case 'valideParSuperieur':
          this.codeStatut= 'VALIDE_PAR_SUPERIEUR'
          this.titre = "Liste des demandes validées par le supérieur"
          break;
        case 'refuse':
          this.codeStatut= 'REJETEE'
          this.titre = "Liste des demandes rejetées"
          break;
        case 'enTraitement':
          this.codeStatut= 'VALIDEE_POUR_TRAITEMENT'
          this.titre = "Liste des demandes en cours de traitement"
          break;
        case 'visaDemandeur':
          this.codeStatut= 'VISA_DEMANDEUR'
          this.titre = "Liste des demandes en attente de votre visa" 
          break;
        case 'traitee':
          this.codeStatut= 'TRAITEE'
          this.titre = "Liste des demandes traitées"
          break;
        default:
          this.codeStatut= 'EN_ATTENTE'
          this.titre = "Liste des demandes en attente"
          break;
        }

        this.getDemandesByStatut();
      })
    
    // console.log(localStorage.getItem('u'))
  }

  rechargerPage(): void {
    window.location.reload()
  }
  public getAllDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (response: Demande[]) => {
        this.demandes = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDemandesByStatut(): void {
    this.demandeService.getDemandeByStatut(this.codeStatut).subscribe(
      (response: Demande[])=> {
        this.demandes = response
        this.dataSource.data = response
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }

  public openDialogUpdateDemande(idDemandeToUpdate:number): void {
    const dialogRef = this.dialog.open(DemandeFormComponent, {
      data: {idDemande: idDemandeToUpdate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed")
      this.getAllDemandes();
    });
  }

  public openDialogCreateDemande(): void {
    const dialogRef = this.dialog.open(DemandeFormComponent, {
      data: {idDemande: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllDemandes();
    });
  }

  public goToCreateDemande(idType: number): void {
    this.router.navigateByUrl("/content/demande/creer/"+idType)
  }
  public goToUpdateDemande(demande:Demande): void {
    this.data.setDemande(demande)
    this.router.navigateByUrl("/content/demande/creer/"+demande.idType)
  }
}
