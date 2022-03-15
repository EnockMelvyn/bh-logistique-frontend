import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Livraison } from 'src/app/models/livraison';
import { DataService } from 'src/app/services/data.service';
import { LivraisonService } from 'src/app/services/livraison.service';

@Component({
  selector: 'app-bl-list',
  templateUrl: './bl-list.component.html',
  styleUrls: ['./bl-list.component.css']
})
export class BlListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  colonnes= ["numeroBl", "dateLivraison", "fournisseur", "actions"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  livraisons: Livraison[] = []
  loading = false
  constructor(private livraisonService: LivraisonService, public dataService : DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllLivraisons();
    
  }

  public getAllLivraisons(): void {
    this.loading = true
    this.livraisonService.getAllLivraisons().subscribe(
      (response: Livraison[]) => {
        this.loading = false
        this.livraisons = response ;
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        alert(error.message);
      }
    )
  }

  public goToRecap(livraison : Livraison): void {
    this.dataService.livraison = livraison
    this.router.navigateByUrl("content/livraison/recap")
  }
  public goToForm(livraison : Livraison): void {
    this.dataService.livraison = livraison
    this.router.navigateByUrl("content/livraison/creer")
  }

}
