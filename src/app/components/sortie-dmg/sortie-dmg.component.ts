import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeDirectionService } from 'src/app/services/demande-direction.service';

@Component({
  selector: 'app-sortie-dmg',
  templateUrl: './sortie-dmg.component.html',
  styleUrls: ['./sortie-dmg.component.css']
})
export class SortieDmgComponent implements OnInit {

  loading = false
  demDir: DemandeDirection = {}
  dataSource : MatTableDataSource<DemandeDirection> = new MatTableDataSource()
  colonnes =['article',  'quantiteValideDmg']
  // , 'quantiteSortieDmg', 'quantiteRecueDir' ,'quantiteDemande', 'quantiteValideDir',
  constructor(private demDirService: DemandeDirectionService, private dataServ: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.demDir = this.dataServ.demandeDirection
    this.dataServ.demandeDirection={}
    if(this.demDir.demandeDirectionDetails) {
      this.dataSource.data = this.demDir.demandeDirectionDetails!
    }
    
  }

  public procederSortie(): void {
    this.loading = true
    this.demDir.modifiedBy = this.authService.userConnected().emailUser
    this.demDirService.dmgSortieDemandeToDmg(this.demDir).subscribe(
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
