import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SousFamille } from '../models/sousFamille';
import { sousFamilleService } from '../services/sousFamille.service';

@Component({
  selector: 'app-sousfamille-form',
  templateUrl: './sousfamille-form.component.html',
  styleUrls: ['./sousfamille-form.component.css']
})
export class SousfamilleFormComponent implements OnInit {

  public idSousFamille=-1

  public sousFamille : SousFamille = { idSousFamille:0, libelleSousFamille:'',codeSousFamille:'', famille: null};

  constructor(private sousFamilleService : sousFamilleService , @Inject(MAT_DIALOG_DATA) public data: {idSousFamille: number}) { }


  ngOnInit(): void {
    if (this.data.idSousFamille != null) {
      this.getSousFamille() 
      this.idSousFamille= this.data.idSousFamille
    }
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  public createSousFamille(): void {
    this.sousFamilleService.createSousFamille(this.sousFamille).subscribe(
      (response: SousFamille) => {
        this.sousFamille = response ;
        alert('SousFamille ajoutée avec succès');
        console.log(this.sousFamille)
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public getSousFamille(): void {
    this.sousFamilleService.getSousFamilleById(this.data.idSousFamille).subscribe(
      (response: SousFamille) => {
        this.sousFamille = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


  public updateSousFamille(): void {
    this.sousFamilleService.updateSousFamille(this.data.idSousFamille, this.sousFamille).subscribe(
      (response: SousFamille) => {
        this.sousFamille = response ;
        alert('SousFamille mise à jour');
        console.log(this.sousFamille)
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }
  
}
