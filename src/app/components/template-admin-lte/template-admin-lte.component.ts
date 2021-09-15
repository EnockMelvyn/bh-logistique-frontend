import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-admin-lte',
  templateUrl: './template-admin-lte.component.html',
  styleUrls: ['./template-admin-lte.component.css']
})
export class TemplateAdminLTEComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem('userConnected'))
  }

}
