import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DashboardDemande } from 'src/app/models/dashboard-demande';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DemandeService } from 'src/app/services/demande.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabCorrespondanceDemandes : any
  dashboardDemandes : DashboardDemande []=[]
  constructor(private dashboardService: DashboardService, private authService: AuthService, private demandeService: DemandeService) { }

  ngOnInit(): void {
    this.tabCorrespondances()
    this.demandeDashboard()
  }

  public demandeDashboard():void {
    this.dashboardService.getDashboardDemande(this.authService.userConnected().emailUser!).subscribe(
      (response : DashboardDemande[]) => { 
        this.dashboardDemandes = response
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  public tabCorrespondances(): void {
    this.tabCorrespondanceDemandes = this.demandeService.page_code
  }
}
