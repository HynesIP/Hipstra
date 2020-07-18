import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { FormGroup,Validators,FormArray,FormControl } from '@angular/forms';
import { AuthService } from '../../api/services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-widget-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginWidgetComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    showCreate: boolean = false;

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
    

      showCreateCard(): void {
        this.showCreate = true;
      }

    public loginAccount() {
      sessionStorage.setItem("email",this.loginForm.get("email").value);
      this.auth.login(this.loginForm.get("email").value, this.loginForm.get('password').value)
        .pipe(first())
        .subscribe(
          result =>{ 
            console.log(result);

            location.href = "./requests"
//            this.router.navigateByUrl('/requests');
          },
          error=>{
            this.error_message="Invalid Credentials"
          });
          //this.navigateToChat()
    }

    pressAccount(e: any){
      console.log(e);
      if(e.key == "Enter"){
        this.loginAccount();
      }
    }

    checkToken(){

      console.log(this.auth.isTokenExpired())
      //console.log(this.auth.getTokenExpirationDate())

    }

}
