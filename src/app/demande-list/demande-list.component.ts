import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DemandeFormComponent } from '../demande-form/demande-form.component';
import { Demande } from '../models/demande';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<Demande>;
  demandes: Demande[] = [];

  columnsToDisplay = ['numRef','estimation', 'observation', 'dateDemande', 'demandeur', 'statutDemande', 'urgent', 'justifUrgence', 'actions']
        

  constructor(private demandeService: DemandeService, public dialog: MatDialog,) { }

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
}
