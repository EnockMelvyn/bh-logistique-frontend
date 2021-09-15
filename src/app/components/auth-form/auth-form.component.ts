import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import * as encoder from 'js-sha512';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  formAuth : FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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
    console.log(user)
    this.authService.connexionUser(user).subscribe(
      (response: any) => {
        console.log(response)
        if(!response.hasError) {
          localStorage.setItem('userConnected', response.items[1]);
          console.log("je suis rentré")
          console.log(response.status.message)
          this.router.navigateByUrl('content')
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
