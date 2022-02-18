import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { HasRoleAdminGuard } from 'src/app/guards/has-role-admin.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-template-admin-lte',
  templateUrl: './template-admin-lte.component.html',
  styleUrls: ['./template-admin-lte.component.css']
})
export class TemplateAdminLTEComponent implements OnInit {

  menuComplet = ['accueil','dashboard','sortie', 'commande', 'livraison','demande','demandeDMG','demandeDirection','inventaire','parametre']
  menuAcces: string[] = []
  constructor(private authService:AuthService, private router: Router, private role:HasRoleAdminGuard) { }
  
  ngOnInit(): void {
    console.log("template admin")
    this.role.canActivate
    if(this.authService.userConnected().profileRole?.includes('ADMIN')){
      this.menuAcces = this.menuComplet
    } else if (this.authService.userConnected().profileRole?.includes('DMG')) {
      this.menuAcces = ['accueil','dashboard','sortie', 'commande', 'livraison','demande', 'demandeDMG','demandeDirection','inventaire','parametre']
    } else if (this.authService.userConnected().profileRole?.includes('ECO')) {
      this.menuAcces = ['accueil','dashboard','sortie', 'commande', 'livraison','demande','demandeDMG','demandeDirection','inventaire','parametre']
    } else if (this.authService.userConnected().profileRole?.includes('REPDIR')) {
      this.menuAcces = ['accueil','demande','demandeDirection']
    } else {
      this.menuAcces = ['accueil','demande']
    }
  }


  disconnectUser():void{
    this.authService.disconnectUser()
  }

}
