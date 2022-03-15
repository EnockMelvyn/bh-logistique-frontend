import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Livraison } from 'src/app/models/livraison';
import { LivraisonDetail } from 'src/app/models/livraison-detail';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-bl-recap',
  templateUrl: './bl-recap.component.html',
  styleUrls: ['./bl-recap.component.css']
})
export class BlRecapComponent implements OnInit {

  livraison : Livraison = {}
  montantTotal : number = 0
  dataSource : MatTableDataSource<LivraisonDetail> = new MatTableDataSource()

  colonnes = ["article","prixUnitaire", "quantite", "montant"]
  constructor( private dataService: DataService, private router: Router) { 
    this.livraison= dataService.livraison
  }

  ngOnInit(): void {
    this.dataSource.data = this.livraison.livraisonDetails!
    this.calculMontantTotal()
  }

  calculMontantTotal() {
    this.montantTotal = 0
    this.livraison.livraisonDetails?.forEach(livDet => {
      this.montantTotal = this.montantTotal+(livDet.prixUnitaire*livDet.quantite)
    })
  }

  retour() {
    this.router.navigateByUrl('/content/livraison/list')
  }

  public createExcelArray (donnees :any[]): any[] {
    let dataToReturn: any[] = []
    donnees.forEach(element => {
      dataToReturn.push({
        'Code article': element.article?.codeArticle,
        'Libellé article': element.article?.libelleArticle,
        'Quantité': element.quantite,
        'Prix d\'achat': element.prixUnitaire
      })
    });
    return dataToReturn;
  }
  public exportToExcel () {
     this.dataService.exportToExcel(this.createExcelArray(this.livraison.livraisonDetails!),'Livraison.xlsx');
  }
}
