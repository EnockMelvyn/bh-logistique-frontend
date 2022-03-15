import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Inventaire } from 'src/app/models/inventaire';
import { DataService } from 'src/app/services/data.service';
import { InventaireService } from 'src/app/services/inventaire.service';

@Component({
  selector: 'app-inventaire-list',
  templateUrl: './inventaire-list.component.html',
  styleUrls: ['./inventaire-list.component.css']
})
export class InventaireListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator : MatPaginator
  inventaires : Inventaire[] = []
  loading = false
  dataSource : MatTableDataSource<any> = new MatTableDataSource()

  colonnes = ['dateInventaire','status','libelle','valeurEcart','actions']
  constructor(private inventaireService: InventaireService, private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllInventaire()
  }

  getAllInventaire() {
    this.loading = true
    this.inventaireService.getAllInventaire().subscribe(
      (response : Inventaire[]) => {
        this.loading = false
        this.inventaires = response
        this.dataSource.data = this.inventaires
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) =>{
        this.loading = false
        console.log(error.message)
      }
    )
  }

  goToFormInventaire(inventaire: Inventaire) {
    this.dataService.inventaire = inventaire
    this.router.navigateByUrl('content/inventaire/creer')
  }
}
