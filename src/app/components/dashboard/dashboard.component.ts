import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  dashboardDemandes : DashboardDemande []=[]
  constructor(private dashboardService: DashboardService, private authService: AuthService, private demandeService: DemandeService,
    private router: Router) { }

  ngOnInit(): void {
    this.demandeDashboard()
  }

  public demandeDashboard():void {
    this.dashboardService.getDashboardDemande(this.authService.userConnected().emailUser!).subscribe(
      (response : DashboardDemande[]) => { 
        this.dashboardDemandes = response
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  public goToDetailDemandeDashboard( demandeDashboard: DashboardDemande): void {
    this.demandeService.page_code.forEach(element => {
      if (demandeDashboard.statut === element.code ){
        this.router.navigateByUrl("/content/demande/list/"+element.page)
      }
    });
  }
}
