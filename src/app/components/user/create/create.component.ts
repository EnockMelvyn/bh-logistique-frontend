
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Direction } from 'src/app/models/direction';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import * as encoder from 'js-sha512';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { DirectionService } from 'src/app/services/direction.service';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User = {}
  users : User[] = []
  directions : Direction[] = []
  allProfils : Profile [] =[]
  profils: String[] = []

  formUser : FormGroup
  constructor(private authService : AuthService, private formBuilder : FormBuilder, private profilService: ProfilService,
    private directionService : DirectionService, private dataService : DataService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.dataService.user
    this.formUser= this.formBuilder.group({
      "email" : [this.user.emailUser],
      "login" : [this.user.login],
      "nameUser": [this.user.nameUser],
      "lastnameUser": [this.user.lastnameUser],
      "profiles": [this.user.profiles],
      "directionId": [this.user.directionId],
      "password": [this.user.password],
      "matricule": [this.user.matricule]
    })
    this.getAllProfiles()
    this.getAllDirections()
  }

  addProfil(profil: Profile) {
    this.profils.push(profil.code!)
  }

  removeProfil(index : number) {
    this.profils.splice(index,1)
    // this.profils.forEach((element,index) => {
    //   element == profil.codeProfile ? this.profils.splice(index,1) : null
    // });
  }

  buildUser():User {
    let userBuilt= this.user
    this.user.emailUser = this.formUser.get('email')?.value
    this.user.login = this.formUser.get('login')?.value
    this.user.nameUser = this.formUser.get('nameUser')?.value
    this.user.lastnameUser = this.formUser.get('lastnameUser')?.value
    this.user.directionId = this.formUser.get('directionId')?.value
    this.user.password = encoder.sha512(this.formUser.get('password')?.value)
    this.user.matricule = this.formUser.get('matricule')?.value

    this.formUser.get('profiles')?.value?.forEach((element:string) => {
      console.log(element)
      this.profils.push(element)
    })
    console.log(this.profils)
    return userBuilt
  }

  createUser()  {
    let userToCreate = this.buildUser()
    this.authService.createUser(userToCreate).subscribe(
      (response : any) => {
        this.user = response.items[0]

        let profilPerso = {"idPerso": this.user.idUser, "codesProfile": this.profils}
        this.authService.createProfilPersonnel(profilPerso).subscribe(
          (response2 : any) => {
            console.log("Données sup"+response2)
            this.user.directionId = response2.directionId
            this.user.profiles = response2.profilesCode
            alert("Utilisateur enregistré")
            this.goToListeUser()
          }
        )
      }
    )
  }
  updateUser()  {
    let userToUpdate = this.buildUser()
    userToUpdate.idUser = this.user.idUser
    this.authService.updateUser(userToUpdate).subscribe(
      (response : any) => {
        this.user = response.items[0]
        let profilPerso = {"email": this.user.emailUser, "codesProfil": this.profils}
        this.authService.createProfilPersonnel(profilPerso).subscribe(
          (response2 : any) => {
            console.log("Données sup"+response2)
            this.user.directionId = response2.directionId
            this.user.profiles = response2.profilesCode
            alert("Utilisateur mis à jour")
            this.goToListeUser()
          }
        )
      }
    )
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.items
      }, 
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  getAllProfiles(){
    this.profilService.getAllProfils().subscribe(
      (response: any) => {
        console.log(response)
        this.allProfils= response
      }, 
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  getAllDirections(){
    this.directionService.getAllDirections().subscribe(
      (response: any) => {
        console.log(response)
        this.directions= response
      }, 
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  goToListeUser(){
    this.user = {}
    this.dataService.user = this.user
    this.router.navigateByUrl('/content/parametre/utilisateur/liste')
  }

}
