import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from 'src/app/models/commande';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {

  colonnes = ["numeroCommande","dateCommande", "createdBy", "status"]
  commandes : Commande[]= []
  dataSource : MatTableDataSource<Commande> = new MatTableDataSource();
  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.getAllCommande()
    this.dataSource.data = this.commandes
  }

  public getAllCommande(): void {
    
    this.commandeService.getAllCommandes().subscribe(
      (response: Commande[]) => {
        this.commandes = response ;
        this.dataSource.data = response;
        console.log(this.commandes)
                // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
