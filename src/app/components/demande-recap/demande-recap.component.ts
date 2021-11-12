import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demande } from 'src/app/models/demande';
import { DataService } from 'src/app/services/data.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-demande-recap',
  templateUrl: './demande-recap.component.html',
  styleUrls: ['./demande-recap.component.css']
})
export class DemandeRecapComponent implements OnInit {

  demande: Demande = {}
  constructor(private demandeService:DemandeService, private data: DataService, private router:Router) {
    this.demande = this.data.getDemande()
   }

  ngOnInit(): void {
  }

  public validerDemande(): void {
    
    this.demandeService.validateOrRefuseDemande(this.demande.idDemande!, "validate")
  }
}
