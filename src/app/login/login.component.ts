import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../node_modules/@angular/forms';
import { FormGroup,Validators,FormArray,FormControl } from '@angular/forms';
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;

    public error_message: string;
    public u :string;
  
    constructor(
      private auth: AuthService, 
      private router: Router,
      private fb:FormBuilder
      ){}

    //Reactive Form
    loginForm:FormGroup

    ngOnInit() {

        this.loginForm=this.fb.group({
            email:["",Validators.required],
            password:["",Validators.required]
           })

           /*
                  var body = document.getElementsByTagName('body')[0];
                  body.classList.add('login-page');

                  var navbar = document.getElementsByTagName('nav')[0];
                  navbar.classList.add('navbar-transparent');
          */

    }
    /*
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    */
    navigateToChat() {
        this.router.navigateByUrl('/requests', { state: this.loginForm.value });
        console.log(this.loginForm.value);
      }
    
      public submit() {
        sessionStorage.setItem("email",this.loginForm.get("email").value);
        this.auth.login(this.loginForm.get("email").value, this.loginForm.get('password').value)
          .pipe(first())
          .subscribe(
            result =>{ 
            this.router.navigateByUrl('/requests')
            
            },
            error=>{
              this.error_message="Invalid Credentials"
    
            });
            this.navigateToChat()
      }


}
