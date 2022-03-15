import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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

  @ViewChild(MatPaginator) paginator: MatPaginator
  loading = false
  titre = ''
  statutCommandes =''
  codeStatut =''
  colonnes = ["numeroCommande","dateCommande", "createdBy", "status", "actions"]
  commandes : Commande[]= []
  dataSource : MatTableDataSource<Commande> = new MatTableDataSource();
  constructor(private commandeService: CommandeService, private router: Router, private data : DataService,
    private route: ActivatedRoute) {
          
     }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.statutCommandes = params.statutCommandes
      switch (this.statutCommandes) {
        case 'livre':
          this.codeStatut= 'LIV'
          this.titre = "Liste des commandes Livrées"
          break;
        case 'refuse':
          this.codeStatut= 'REJ'
          this.titre = "Liste des commandes rejetées"
          break;
        case 'valide':
          this.codeStatut= 'VAL'
          this.titre = "Liste des commandes validées"
          break;
        default:
          this.codeStatut= 'ATT'
          this.titre = "Liste des commandes en attente"
          break;
      }
      this.getCommandesByStatut()
    } );
     
    
    console.log(this.statutCommandes)
  }

  rechargerPage(): void {
    window.location.reload()
  }

  public validateCommand(commande: Commande){
    this.data.setCommande(commande)
    this.router.navigateByUrl('content/commande/recap')
  }
  
  public editCommand(commande: Commande){
    this.data.setCommande(commande)
    this.router.navigateByUrl('content/commande/creer')
  }

  public getCommandesByStatut(): void {
    this.loading= true
    this.commandeService.getCommandesByStatut(this.codeStatut).subscribe(
      (response: Commande[]) => {
        this.loading = false
        this.commandes = response ;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator
      },
      (error: HttpErrorResponse) => {
        this.loading = false
        alert(error.message);
      }
    )
  }
  public goToForm(): void {
    this.router.navigateByUrl('/content/commande/enregistrer')
  }

}
