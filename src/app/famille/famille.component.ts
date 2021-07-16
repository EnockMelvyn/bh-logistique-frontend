import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FamilleFormComponent } from '../famille-form/famille-form.component';
import { Famille } from '../models/famille';
import { FamilleService } from '../services/famille.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {

  // familleSelected = new Famille ;
  familles: Famille[] = [];

  columnsToDisplay = ['libelleFamille','codeFamille']

  constructor(private familleService: FamilleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFamilles();
  }

  public getAllFamilles(): void {
    this.familleService.getAllFamilles().subscribe(
      (response: Famille[]) => {
        this.familles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  openDialogUpdateFamille(row:Famille): void {
    const dialogRef = this.dialog.open(FamilleFormComponent, {
      width: '1000px',
      height:'1000px',
      data: {idFamille: row.idFamille}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreateFamille(): void {
    const dialogRef = this.dialog.open(FamilleFormComponent, {
      width: '1000px',
      height:'1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

