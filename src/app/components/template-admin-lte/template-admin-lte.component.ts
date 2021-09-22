import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-template-admin-lte',
  templateUrl: './template-admin-lte.component.html',
  styleUrls: ['./template-admin-lte.component.css']
})
export class TemplateAdminLTEComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("template admin")
  }

  disconnectUser():void{
    this.authService.disconnectUser()
  }
}
