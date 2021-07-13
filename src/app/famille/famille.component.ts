import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Famille } from './famille';
import { FamilleService } from './famille.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {

  familles: Famille[] = [];

  constructor(private familleService: FamilleService) { }

  ngOnInit(): void {
    this.getAllFamilles();
  }

  public getAllFamilles(): void {
    this.familleService.getAllFamilles().subscribe(
      (response: Famille[]) => {
        this.familles = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

}
