import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Sortie } from 'src/app/models/sortie';
import { SortieService } from 'src/app/services/sortie.service';

@Component({
  selector: 'app-sortie-list',
  templateUrl: './sortie-list.component.html',
  styleUrls: ['./sortie-list.component.css']
})
export class SortieListComponent implements OnInit {

  colonnes = ['article','demande', 'dateDemande','reference','quantite','dateSortie']
  sorties: Sortie[] = []
  constructor(private sortieService: SortieService) { }

  ngOnInit(): void {
    this.getAllSorties()
  }

  public getAllSorties():void {
    this.sortieService.getAllSorties().subscribe(
      (response: Sortie[])=> {
        this.sorties = response
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

}
