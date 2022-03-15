import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Famille } from 'src/app/models/famille';
import { FamilleService } from 'src/app/services/famille.service';
import { FamilleFormComponent } from '../famille-form/famille-form.component';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Famille>;
  @ViewChild(MatPaginator) paginator : MatPaginator
  // familleSelected = new Famille ;
  dataSource : MatTableDataSource<Famille> = new MatTableDataSource()
  public familles: Famille[] = [];
  loading = false
  columnsToDisplay = ['libelleFamille','codeFamille', 'actions']

  constructor(private familleService: FamilleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFamilles();
  }

  public getAllFamilles(): void {
    this.loading = true
    this.familleService.getAllFamilles().subscribe(
      (response: Famille[]) => {
        this.loading = false
        this.familles = response ;
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
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

