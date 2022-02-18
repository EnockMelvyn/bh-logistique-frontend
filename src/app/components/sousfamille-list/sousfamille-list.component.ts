import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  columnsToDisplay = ['libelleSousFamille','codeSousFamille', 'famille', 'actions']

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
