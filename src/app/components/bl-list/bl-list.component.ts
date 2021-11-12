import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Livraison } from 'src/app/models/livraison';
import { LivraisonService } from 'src/app/services/livraison.service';
import { BlFormComponent } from '../bl-form/bl-form.component';

@Component({
  selector: 'app-bl-list',
  templateUrl: './bl-list.component.html',
  styleUrls: ['./bl-list.component.css']
})
export class BlListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  colonnes= ["numeroBl", "dateLivraison", "fournisseur"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  livraisons: Livraison[] = []

  constructor(private livraisonService: LivraisonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllLivraisons();
  }

  public getAllLivraisons(): void {
    this.livraisonService.getAllLivraisons().subscribe(
      (response: Livraison[]) => {
        this.livraisons = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  openDialogUpdateLivraison(row:Livraison): void {
    const dialogRef = this.dialog.open(BlFormComponent, {
      data: {idLivraison: row.idLivraison}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

  openDialogCreateLivraison(): void {
    const dialogRef = this.dialog.open(BlFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

}
