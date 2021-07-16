import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SousFamille } from '../models/sousFamille';
import { sousFamilleService } from '../services/sousFamille.service';
import { SousfamilleFormComponent } from '../sousfamille-form/sousfamille-form.component';

@Component({
  selector: 'app-sousfamille-list',
  templateUrl: './sousfamille-list.component.html',
  styleUrls: ['./sousfamille-list.component.css']
})
export class SousfamilleListComponent implements OnInit {

  sousFamilles: SousFamille[] = [];

  columnsToDisplay = ['libelleSousFamille','codeSousFamille', 'famille']

  constructor(private sousFamilleService: sousFamilleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllSousFamilles();
  }

  public getAllSousFamilles(): void {
    this.sousFamilleService.getAllSousFamilles().subscribe(
      (response: SousFamille[]) => {
        this.sousFamilles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  openDialogUpdateSousFamille(row:SousFamille): void {
    const dialogRef = this.dialog.open(SousfamilleFormComponent, {
      width: '1000px',
      height:'1000px',
      data: {idSousFamille: row.idSousFamille}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreateSousFamille(): void {
    const dialogRef = this.dialog.open(SousfamilleFormComponent, {
      width: '1000px',
      height:'1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
