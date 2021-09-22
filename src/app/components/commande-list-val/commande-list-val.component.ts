import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande';
import { CommandeService } from 'src/app/services/commande.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-commande-list-val',
  templateUrl: './commande-list-val.component.html',
  styleUrls: ['./commande-list-val.component.css']
})
export class CommandeListValComponent implements OnInit {

  colonnes = ["numeroCommande","dateCommande", "createdBy", "status", "actions"]
  commandes : Commande[]= []
  dataSource : MatTableDataSource<Commande> = new MatTableDataSource();
  constructor(private commandeService: CommandeService, private router: Router, private data : DataService) { }

  ngOnInit(): void {
    this.getCommandesValid()
    
  }

  public clickOnCommand(commande: Commande){
    this.data.setCommande(commande)
    this.router.navigateByUrl('content/commande/recap')
  }
  public getCommandesValid(): void {
    
    this.commandeService.getCommandesByStatut('VAL').subscribe(
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
