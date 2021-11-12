
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { DemandeDirectionDetails } from 'src/app/models/demande-direction-details';
import { Direction } from 'src/app/models/direction';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeDirectionService } from 'src/app/services/demande-direction.service';

@Component({
  selector: 'app-vue-validateur',
  templateUrl: './vue-validateur.component.html',
  styleUrls: ['./vue-validateur.component.css']
})
export class VueValidateurComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  demDir : DemandeDirection = {}
  loading = false

  colonnes = ['article', 'quantiteDemande', 'quantiteValideDir']
  dataSource: MatTableDataSource<DemandeDirectionDetails> = new MatTableDataSource()
  constructor(private demDirService : DemandeDirectionService, private authService : AuthService) { }

  ngOnInit(): void {
    this.genererDemande(this.authService.userConnected().directionId!);
  }

  public genererDemande(idDirection: number): void {
    this.loading=true
    let direction : Direction = {'idDirection': idDirection}
    this.demDirService.genererDemande(direction).subscribe(
      (response: DemandeDirection) => {
        this.loading =false
        this.demDir = response
        
        this.dataSource.data = response.demandeDirectionDetails!
      },
      (error: HttpErrorResponse) => {
        this.loading =false
        alert(error.error.message)
      }
    )
  }

  public validerDemande(): void {
    console.log("Demaden envoyée")
    console.log(this.demDir)
    this.demDir.modifiedBy = this.authService.userConnected().emailUser
    this.demDir.createdBy = this.authService.userConnected().emailUser
    this.demDirService.sendDemandeToDmg(this.demDir).subscribe(
      (response: DemandeDirection) => {
        alert("Demande validée et transmise aux Moyens généraux")
        this.demDir=response
        console.log("Demaden enregistrée")
        console.log(response)
        this.table.renderRows()
      }
    )
  }
}
