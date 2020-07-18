import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

  public email: string;
  public uuid: string;
  public password: string;
  public name: string;
  public nickName: string;

  public error: string;
  public success_message:string;
  public error_message:string;
  constructor(
      private auth: AuthService, 
      private router: Router
    ){}

  public submit() {
    console.log("Sign up called");

    this.auth.signup(this.name,this.nickName,this.uuid,this.email, this.password)
      .pipe(first())
      .subscribe(
        result =>{
          this.success_message="User Created Successfully"
          this.email=null;
          this.password=null;
          this.uuid=null;
          this.name=null;
          this.nickName=null;
        } ,
        err => this.error_message = 'Could not create user'
      );
  }

}