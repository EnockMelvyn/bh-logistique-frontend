import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sortie } from 'src/app/models/sortie';
import { SortieService } from 'src/app/services/sortie.service';

@Component({
  selector: 'app-sortie-list',
  templateUrl: './sortie-list.component.html',
  styleUrls: ['./sortie-list.component.css']
})
export class SortieListComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  dataSource : MatTableDataSource<Sortie> = new MatTableDataSource
  colonnes = ['article','demandeDirection', 'dateDemande','reference','quantite','dateSortie']
  sorties: Sortie[] = []
  loading = false
  constructor(private sortieService: SortieService) { }

  ngOnInit(): void {
    this.getAllSorties()
  }

  public getAllSorties():void {
    this.loading = true
    this.sortieService.getAllSorties().subscribe(
      (response: Sortie[])=> {
        this.loading = false
        this.sorties = response
        this.dataSource.data = response
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        console.log(error.message)
      }
    )
  }

}
