import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur.service';

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit {

  // idFournisseur = -1
   fournisseur : Fournisseur = {};
  
    constructor(private fournisseurService : FournisseurService, 
      public dialogRef: MatDialogRef<FournisseurFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {idFournisseur: number}) { }
  
    ngOnInit(): void {      
      if (this.data) {
        this.getFournisseur() 
        // this.idFournisseur= this.data.idFournisseur
      }
      console.log(this.fournisseur)
    }
  
    onSubmit(form: NgForm) {
      console.log(form.value);
    }
    public createFournisseur(): void {
      this.fournisseurService.createFournisseur(this.fournisseur).subscribe(
        (response: Fournisseur) => {
          this.fournisseur = response ;
          alert('Fournisseur ajoutée avec succès');
          console.log(this.fournisseur)
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  
    public getFournisseur(): void {
      this.fournisseurService.getFournisseurById(this.data.idFournisseur).subscribe(
        (response: Fournisseur) => {
          this.fournisseur = response ;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  
  
    public updateFournisseur(): void {
      this.fournisseurService.updateFournisseur(this.data.idFournisseur, this.fournisseur).subscribe(
        (response: Fournisseur) => {
          this.fournisseur = response ;
          alert('Fournisseur mise à jour');
          console.log(this.fournisseur)
          this.dialogRef.close()
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
}
