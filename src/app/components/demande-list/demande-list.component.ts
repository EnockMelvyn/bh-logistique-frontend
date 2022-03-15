
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/models/demande';
import { Direction } from 'src/app/models/direction';
import { Status } from 'src/app/models/status';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DemandeService } from 'src/app/services/demande.service';
import { DirectionService } from 'src/app/services/direction.service';
import { StatusService } from 'src/app/services/status.service';
import { DemandeFormComponent } from '../demande-form/demande-form.component';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Demande>;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  dataSource : MatTableDataSource<Demande> = new MatTableDataSource();
  demandes: Demande[] = [];

  loading = false
  titre = ''
  statutDemandes =''
  codeStatut =''
  direction: Direction = {}
  directions: Direction[] = []
  statut : Status ={}
  status : Status [] = []
  statuts = ['VALIDE_PAR_SUPERIEUR','REJETEE','VALIDEE_POUR_TRAITEMENT','VISA_DEMANDEUR','TRAITEE', 'EN_ATTENTE']
  columnsToDisplay = ['numRef', 'observation', 'dateDemande', 'demandeur', 'directionId','status', 'urgent', 'actions']
        

  constructor(private demandeService: DemandeService, public dialog: MatDialog, private authService: AuthService, private router: Router,
    private data:DataService, private route:ActivatedRoute, private directionService: DirectionService, private statusService : StatusService) { 
      if(this.data.getDirection()){
        this.direction = this.data.getDirection()
      }
    }

  ngOnInit(): void {
    this.getAllStatus()
    this.getDemandesByStatutEtDirection()
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
      })

    //     this.getDemandesByStatut();
        this.getDirections();
    //   })
    
    // console.log(localStorage.getItem('u'))
  }

  rechargerPage(): void {
    window.location.reload()
  }

  public getAllDemandes(): void {
    this.loading = true
    this.demandeService.getAllDemandes().subscribe(
      (response: Demande[]) => {
        this.loading = false
        this.demandes = response ;
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        alert(error.message);
      }
    )
  }

  public getAllStatus(): void {
    this.statusService.getAllStatus().subscribe(
      (response: Status[]) => {
        this.status = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDemandesByStatut(): void {
    this.loading = true
    this.demandeService.getDemandeByStatut(this.codeStatut).subscribe(
      (response: Demande[])=> {
        this.loading = false
        this.demandes = response
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        this.loading = false
        console.log(error.message)
      }
    )
  }
  public getDemandesByStatutEtDirection(): void {
    this.dataSource.data = []
    this.loading = true
    console.log(this.loading)
    console.log(this.statut)
    console.log(this.direction)
    this.demandeService.getDemandeByStatusEtDirection(this.statut?this.statut.idStatut!:null, this.direction.idDirection?this.direction.idDirection:null).subscribe(
      (response: Demande[])=> {
        this.loading = false
        console.log(this.loading)
        this.demandes = response
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
        console.log(response)
      },
      (error:HttpErrorResponse)=>{
        this.loading = false
        console.log(error.message)
      }
    )
  }

  public getDirections(): void {
    this.directionService.getAllDirections().subscribe(
      (response: Direction[]) => {
        this.directions = response
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
