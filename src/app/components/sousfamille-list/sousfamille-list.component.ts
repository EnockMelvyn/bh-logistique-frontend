import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SousFamille } from 'src/app/models/sousFamille';
import { sousFamilleService } from 'src/app/services/sousFamille.service';
import { SousfamilleFormComponent } from '../sousfamille-form/sousfamille-form.component';

@Component({
  selector: 'app-sousfamille-list',
  templateUrl: './sousfamille-list.component.html',
  styleUrls: ['./sousfamille-list.component.css']
})
export class SousfamilleListComponent implements OnInit {

  public sousFamilles: SousFamille[] = [];
  @ViewChild(MatPaginator) paginator : MatPaginator
  dataSource : MatTableDataSource<SousFamille> = new MatTableDataSource()
  loading = false
  columnsToDisplay = ['libelleSousFamille','codeSousFamille', 'famille', 'actions']

  constructor(private sousFamilleService: sousFamilleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSousFamilles();
  }

  public getAllSousFamilles(): void {
    this.loading = true
    this.sousFamilleService.getAllSousFamilles().subscribe(
      (response: SousFamille[]) => {
        this.loading = false
        this.sousFamilles = response ;
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        alert(error.message);
      }
    )
  }

  openDialogUpdateSousFamille(row:SousFamille): void {
    const dialogRef = this.dialog.open(SousfamilleFormComponent, {
      data: {idSousFamille: row.idSousFamille}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }

  openDialogCreateSousFamille(): void {
    const dialogRef = this.dialog.open(SousfamilleFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }
}
