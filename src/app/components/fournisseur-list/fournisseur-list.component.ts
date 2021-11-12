import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FournisseurFormComponent } from '../fournisseur-form/fournisseur-form.component';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];

  columnsToDisplay = ['nomFournisseur','codeFournisseur', 'contactFournisseur']

  constructor(private fournisseurService: FournisseurService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFournisseurs();
  }

  public getAllFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.fournisseurs = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  openDialogUpdateFournisseur(row:Fournisseur): void {
    const dialogRef = this.dialog.open(FournisseurFormComponent, {
      data: {idFournisseur: row.idFournisseur}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

  openDialogCreateFournisseur(): void {
    const dialogRef = this.dialog.open(FournisseurFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }
}
