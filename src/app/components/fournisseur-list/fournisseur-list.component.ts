import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { FournisseurFormComponent } from '../fournisseur-form/fournisseur-form.component';

@Component({
  selector: 'app-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.css']
})
export class FournisseurListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator
  dataSource : MatTableDataSource<Fournisseur> = new MatTableDataSource()
  fournisseurs: Fournisseur[] = [];
  loading = false
  columnsToDisplay = ['nomFournisseur','codeFournisseur', 'contactFournisseur', 'actions']

  constructor(private fournisseurService: FournisseurService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFournisseurs();
  }

  public getAllFournisseurs(): void {
    this.loading = true
    this.fournisseurService.getAllFournisseurs().subscribe(
      (response: Fournisseur[]) => {
        this.loading = false
        this.fournisseurs = response ;
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
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
