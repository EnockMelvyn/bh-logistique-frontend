import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-template-admin-lte',
  templateUrl: './template-admin-lte.component.html',
  styleUrls: ['./template-admin-lte.component.css']
})
export class TemplateAdminLTEComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("template admin")
  }

  disconnectUser():void{
    this.authService.disconnectUser()
  }

}
