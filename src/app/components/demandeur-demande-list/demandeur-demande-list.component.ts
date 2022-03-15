import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Demande } from 'src/app/models/demande';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DemandeService } from 'src/app/services/demande.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-demandeur-demande-list',
  templateUrl: './demandeur-demande-list.component.html',
  styleUrls: ['./demandeur-demande-list.component.css']
})
export class DemandeurDemandeListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator !: MatPaginator
  status: Status[] = []
  demandes: Demande[] = []
  user: User = {}
  loading = false
  colonnes = ['numRef', 'observation', 'dateDemande', 'directionId','status', 'urgent', 'actions']  // 'demandeur',
 dataSource : MatTableDataSource<Demande> = new MatTableDataSource<Demande>()



  constructor(private demandeService: DemandeService, private authService: AuthService, private statusService: StatusService,
    private router: Router, private data:DataService) { }

  ngOnInit(): void {
    this.user = this.authService.userConnected()
    this.getAllDemandeurDemandes()
  }

  public getAllDemandeurDemandes() {
    this.loading = true
    console.log(this.user.emailUser!)
    this.demandeService.getDemandesByDemandeur(this.user.emailUser!).subscribe(
      (response: Demande[]) => {
        this.loading = false
        console.log(response)
        this.demandes = response
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) =>{
        this.loading = false
        console.log(error.message)
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

  public goToCreateDemande(idType: number): void {
    this.router.navigateByUrl("/content/demande/creer/"+idType)
  }
  public goToUpdateDemande(demande:Demande): void {
    this.data.setDemande(demande)
    this.router.navigateByUrl("/content/demande/creer/"+demande.idType)
  }
}
