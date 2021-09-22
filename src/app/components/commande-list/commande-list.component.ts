import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Commande } from 'src/app/models/commande';
import { CommandeService } from 'src/app/services/commande.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit{

  colonnes = ["numeroCommande","dateCommande", "createdBy", "status", "actions"]
  commandes : Commande[]= []
  dataSource : MatTableDataSource<Commande> = new MatTableDataSource();
  constructor(private commandeService: CommandeService, private router: Router, private data : DataService) { }

  ngOnInit(): void {
    this.getCommandesEnattente()
    // this.dataSource.data = this.commandes
    
  }

  public clickOnCommand(commande: Commande){
    this.data.setCommande(commande)
    this.router.navigateByUrl('content/commande/recap')
  }
  public getCommandesEnattente(): void {
    
    this.commandeService.getCommandesByStatut('ATT').subscribe(
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
  public goToForm(): void {
    this.router.navigateByUrl('/content/commande/enregistrer')
  }

}
