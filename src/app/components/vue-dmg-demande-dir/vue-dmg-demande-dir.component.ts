import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { DataService } from 'src/app/services/data.service';
import { DemandeDirectionService } from 'src/app/services/demande-direction.service';

@Component({
  selector: 'app-vue-dmg-demande-dir',
  templateUrl: './vue-dmg-demande-dir.component.html',
  styleUrls: ['./vue-dmg-demande-dir.component.css']
})
export class VueDmgDemandeDirComponent implements OnInit {

  loading = false
  demDir: DemandeDirection = {}
  dataSource : MatTableDataSource<DemandeDirection> = new MatTableDataSource()
  colonnes =['article', 'quantiteDemande', 'quantiteValideDir', 'quantiteValideDmg']
  // , 'quantiteSortieDmg', 'quantiteRecueDir'
  constructor(private demDirService: DemandeDirectionService, private dataServ: DataService,) { }

  ngOnInit(): void {
    this.demDir = this.dataServ.demandeDirection
    this.dataServ.demandeDirection={}
    if(this.demDir.demandeDirectionDetails) {
      this.dataSource.data = this.demDir.demandeDirectionDetails!
    }
    
  }

  public validerDemande(): void {
    this.loading = true
    this.demDirService.dmgValidateDemandeToDmg(this.demDir).subscribe(
      (response: DemandeDirection) => {
        this.loading = false
        this.demDir = response
        this.dataSource.data = response.demandeDirectionDetails!
      },
      (error: HttpErrorResponse) =>{
        alert(error.error.message)
      }
    )
  }
}
