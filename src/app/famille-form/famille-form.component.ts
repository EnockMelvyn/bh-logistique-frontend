import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Famille } from '../models/famille';
import { FamilleService } from '../services/famille.service';

@Component({
  selector: 'app-famille-form',
  templateUrl: './famille-form.component.html',
  styleUrls: ['./famille-form.component.css']
})
export class FamilleFormComponent implements OnInit {
  
  public idFamille=-1

public famille : Famille = { idFamille:0, libelleFamille:'',codeFamille:''};

  constructor(private familleService : FamilleService , 
    public dialogRef: MatDialogRef<FamilleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {idFamille: number}) { }

  ngOnInit(): void {
    if (this.data) {
      this.getFamille() 
      this.idFamille= this.data.idFamille
    }
    
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
  public createFamille(): void {
    this.familleService.createFamille(this.famille).subscribe(
      (response: Famille) => {
        this.famille = response ;
        alert('Famille ajoutée avec succès');
        console.log(this.famille)
        this.famille = { idFamille:0, libelleFamille:'',codeFamille:''};
        this.ngOnInit()
        // window.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }

  public getFamille(): void {
    this.familleService.getFamilleById(this.data.idFamille).subscribe(
      (response: Famille) => {
        this.famille = response ;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


  public updateFamille(): void {
    this.familleService.updateFamille(this.data.idFamille, this.famille).subscribe(
      (response: Famille) => {
        this.famille = response ;
        alert('Famille mise à jour');
        console.log(this.famille)
        this.famille = { idFamille:0, libelleFamille:'',codeFamille:''};
        this.dialogRef.close()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


}
