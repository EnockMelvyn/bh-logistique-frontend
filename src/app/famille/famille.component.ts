import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FamilleFormComponent } from '../famille-form/famille-form.component';
import { Famille } from '../models/famille';
import { FamilleService } from '../services/famille.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Famille>;
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
      width: 'auto',
      height:'auto',
      data: {idFamille: row.idFamille}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

  openDialogCreateFamille(): void {
    const dialogRef = this.dialog.open(FamilleFormComponent, {
      width: 'auto',
      height:'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

}

