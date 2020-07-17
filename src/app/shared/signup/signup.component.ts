import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { FormGroup,Validators,FormArray,FormControl } from '@angular/forms';
import { type } from 'os';

@Component({
  selector: 'app-widget-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupWidgetComponent  {

  public email: string;
  public uuid: string;
  public password: string;
  public name: string;
  public nickName: string;

  public error: string;
  public success_message:string;
  public success_flag:boolean = false;
  public error_message:string;
  focus:boolean;
  focus1:boolean;

  constructor(
      private auth: AuthService, 
      private router: Router,
      private fb:FormBuilder
    ){}

  public createAccount() {

    
    this.auth.checkname(this.nickName)
    .pipe(first())
     .subscribe(
       result =>{
         
        console.log(result);
        let uuid: any = result["UUID"];
        console.log(uuid);
        /*
         console.log(result["UUID"]["id"]);
         console.log(result["UUID"]["name"]);
         console.log(atob(result["UUID"]["properties"][0]["value"]));
        */


        if(uuid != "f03695547707486ab2308518f04102f7" && this.name !="" && this.email !="" && this.password !=""){
          this.auth.signup(this.name,this.nickName,uuid,this.email,this.password)
          .pipe(first())
          .subscribe(
            result =>{
              this.success_message="Explorer Account created";
              this.success_flag = true;
              this.email=null;
              this.password=null;
              this.name=null;
              this.nickName=null;
            } ,
            err => {
              this.error_message = 'Explorer Account not created, '+err.message;
            }
          );
        }

       } ,
       err => {
         this.error_message = 'Oops, '+err.message;
       }
     );

   
    
  }

}