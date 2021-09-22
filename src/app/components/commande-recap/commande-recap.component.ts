import { DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { Commande } from 'src/app/models/commande';
import { CommandeDetail } from 'src/app/models/commande-detail';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-commande-recap',
  templateUrl: './commande-recap.component.html',
  styleUrls: ['./commande-recap.component.css']
})
export class CommandeRecapComponent implements OnInit{
  codeStatut = ''
  articles : Article[] = []
  commande: Commande = {}
  colonnes = ["article", "CMUP", "quantite"];
  dataSource: MatTableDataSource<CommandeDetail>= new MatTableDataSource();
    constructor(private articleService: ArticleService, private commandeService: CommandeService, private data: DataService,
      private router:Router) {
      this.commande = this.data.getCommande()
      console.log(this.commande)
    }

    ngOnInit(): void {
      this.dataSource.data=this.commande.commandeDetails!
    }

    public getAllArticles(): void {
      this.articleService.getAllArticles().subscribe(
        (response: Article[]) => {
          this.articles = response ;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public getCommandeById(idCommande: number): void {
      this.commandeService.getCommandeById(idCommande).subscribe(
        (response: Commande) => {
          this.commande = response ;
          this.codeStatut = this.commande.status?.codeStatut!
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

    public validateCommande(): void {
      this.commandeService.validateCommande(this.commande).subscribe(
        (response: Commande) => {
          alert("La commande a été validée")
          this.router.navigateByUrl('/content/commande/list')
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    public refuseCommande(): void {
      if (confirm('Êtes-vous sûr de vouloir rejeter la commande?')) {
        this.commandeService.refuseCommande(this.commande).subscribe(
          (response: Commande) => {
            alert("La commande a été rejetée")
            this.router.navigateByUrl('/content/commande/list')
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
      }
      
    }
}
