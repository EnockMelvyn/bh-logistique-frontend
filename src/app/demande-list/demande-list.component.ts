import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DemandeFormComponent } from '../demande-form/demande-form.component';
import { Demande } from '../models/demande';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  demandes: Demande[] = [];

  columnsToDisplay = ['numRef','estimation', 'observation', 'dateDemande', 'demandeur', 'statutDemande', 'urgent', 'justifUrgence']
        

  constructor(private demandeService: DemandeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDemandes();
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

  openDialogUpdateDemande(row:Demande): void {
    const dialogRef = this.dialog.open(DemandeFormComponent, {
      width: '1000px',
      height:'1000px',
      data: {idDemande: row.idDemande != null ? row.idDemande : null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreateDemande(): void {
    const dialogRef = this.dialog.open(DemandeFormComponent, {
      width: '1000px',
      height:'1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
