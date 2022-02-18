import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import * as encoder from 'js-sha512';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  formAuth : FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private data: DataService, private userService:UserService) {
    this.formAuth = this.formBuilder.group({
      login : ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  public connexionUser(): void {
    let user: User 
    user= {
      login: this.formAuth.get('login')?.value,
      password: encoder.sha512(this.formAuth.get('password')?.value)
    }
    // console.log(user)
    this.authService.connexionUser(user).toPromise().then(
      (response: any) => {
        if(!response.hasError) {
          // this.data.setUserConnected(response.items[0])
          
          let userC : User
          userC = response.items[0]
          this.authService.getInfosSupUserByEmail(userC.emailUser!).subscribe(
            (response2: any) =>{
              userC.directionId = response2.directionId
              userC.profiles = response2.profilesCode
              userC.profileRole = response2.profilesCode
              // userC.directionId= 2
            localStorage.setItem('userConnected', JSON.stringify(userC));
            // localStorage.setItem('userConnected', JSON.stringify(response.items[0]));
            // console.log(response.status.message)
            this.router.navigateByUrl('/content/dashboard')
            }
          )
          
        }
        else {
          alert(response.status.message + user.password);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
