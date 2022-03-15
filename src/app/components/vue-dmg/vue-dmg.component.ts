import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeDirection } from 'src/app/models/demande-direction';
import { Status } from 'src/app/models/status';
import { DataService } from 'src/app/services/data.service';
import { DemandeDirectionService } from 'src/app/services/demande-direction.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-vue-dmg',
  templateUrl: './vue-dmg.component.html',
  styleUrls: ['./vue-dmg.component.css']
})
export class VueDmgComponent implements OnInit {
  loading = false
  codeStatus = ""
  dataSource: MatTableDataSource<DemandeDirection> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator : MatPaginator
  colonnes = ['direction', 'dateDemande', 'status', 'actions']
  constructor(private demDirService:DemandeDirectionService, private dataServ : DataService,
    private router: Router, private statusService: StatusService, private route: ActivatedRoute) { 
      route.params.subscribe(params => {
        this.codeStatus = params.codeStatus
      })
    }

  ngOnInit(): void {
    this.getAllDemandeDir()
  }

  // public getAllDemandeDir():void {
  //   this.loading = true
  //   this.demDirService.getDemandeDirByCodeStatus(this.codeStatus).subscribe(
  //     (response: DemandeDirection[])=> {
  //       this.loading=false
  //       this.dataSource.data = response
  //       console.log(response)
  //     },
  //     (error:HttpErrorResponse) => {
  //       alert(error.error.message)
  //     }
  //   )
  // }
  public getAllDemandeDir():void {
    this.loading = true
    this.demDirService.getAllDemandeDir().subscribe(
      (response: DemandeDirection[])=> {
        this.loading=false
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.error.message)
      }
    )
  }

  public goToDetail(demDir: DemandeDirection):void {
    this.dataServ.demandeDirection = demDir
    this.router.navigateByUrl('content/demande/demandeDmgDet')
  }
  public goToSortie(demDir: DemandeDirection):void {
    this.dataServ.demandeDirection = demDir
    this.router.navigateByUrl('content/demande/sortie')
  }


}
