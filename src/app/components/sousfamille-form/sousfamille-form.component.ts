import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Famille } from 'src/app/models/famille';
import { SousFamille } from 'src/app/models/sousFamille';
import { FamilleService } from 'src/app/services/famille.service';
import { sousFamilleService } from 'src/app/services/sousFamille.service';

@Component({
  selector: 'app-sousfamille-form',
  templateUrl: './sousfamille-form.component.html',
  styleUrls: ['./sousfamille-form.component.css']
})
export class SousfamilleFormComponent implements OnInit {

  public idSousFamille=-1
  public familles: Famille[] = []

  public sousFamille : SousFamille = {};
  public formSousFamille: FormGroup;

  constructor(private familleService: FamilleService,private sousFamilleService : sousFamilleService , 
    public dialogRef: MatDialogRef<SousfamilleFormComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {idSousFamille: number}) { 
     
    }


  ngOnInit(): void {
    this.formSousFamille = this.formBuilder.group(
      {
        libelleSousFamille: ['', Validators.required],
        codeSousFamille: ['', Validators.required],
        famille:[{}, Validators.required]
      }
    )

    this.getAllFamilles()
    if (this.data) {
      this.getSousFamille() 
      console.log(this.sousFamille)
      this.idSousFamille= this.data.idSousFamille
      console.log(this.formSousFamille.get("codeSousFamille")?.value + " 11")
    }
    
  }

  public initForm():void {
  
    let sousFam = {
      libelleSousFamille: this.sousFamille.libelleSousFamille?this.sousFamille.libelleSousFamille:'',
      codeSousFamille: this.sousFamille.codeSousFamille?this.sousFamille.codeSousFamille:'',
      famille: this.sousFamille.famille?this.sousFamille.famille:{}
    }
    this.formSousFamille.patchValue(sousFam)
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  public createObjectFamille(): void {
    const formValue = this.formSousFamille.value
    this.sousFamille = {
      libelleSousFamille: formValue["libelleSousFamille"],
      codeSousFamille: formValue["codeSousFamille"],
      famille: formValue["famille"]
    }
    console.log(this.formSousFamille.value)
  }

  public createSousFamille(): void {
    if(this.formSousFamille.valid){
      this.createObjectFamille()
      this.sousFamilleService.createSousFamille(this.sousFamille).subscribe(
        (response: SousFamille) => {
          this.sousFamille = response ;
          alert('SousFamille ajoutée avec succès');
          console.log(this.sousFamille)
          this.sousFamille = {};
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
    }
  }

  public getSousFamille(): void {
    this.sousFamilleService.getSousFamilleById(this.data.idSousFamille).subscribe(
      (response: SousFamille) => {
        this.sousFamille = response ;
        this.initForm()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      )
  }


  public updateSousFamille(): void {
    if(this.formSousFamille.valid){
      this.createObjectFamille()
      this.sousFamilleService.updateSousFamille(this.data.idSousFamille, this.sousFamille).subscribe(
        (response: SousFamille) => {
          this.sousFamille = response ;
          alert('SousFamille mise à jour');
          console.log(this.sousFamille)
          this.dialogRef.close()
          // window.close()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
        )
     }
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
