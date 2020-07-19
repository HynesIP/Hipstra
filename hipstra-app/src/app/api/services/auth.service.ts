import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { isNull } from 'util';
import { ApiConfiguration } from '../api-configuration' ;
import { config } from 'process';

export const TOKEN_NAME: string = "account_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
      private http: HttpClient,
      public apiConfiguration: ApiConfiguration
    ){}
  /*
  //Photo Lab
  //Test API
  //https://preview.webservices.fujifilmesys.com/spa/v3/ENDPOINT
  
  Endpoints
  /Catalogs Complete

  Endpoints:
  /catalogs
  Catalog
  Categories
  CategoriesByCategory

  
  /{serviceType}/?
  GenerationDateTime={generationDateTime}&
  fulfillerName={fulfillerName}&
  categoryId={categoryId}&
  removeMultiImageProducts={removeMultiImageProducts}&
  includeCustomProducts={includeCustomProducts}

  serviceType: MailOrder StorePickup
  generationDateTime: 2011-07-16T19:20:30-05:00 = formatdate()
  fulfillerName: Walmart SamsClub RiteAid Costco
  categoryId: 
  */

  fujitest() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey=18e37d368fce45d8a0b5facf059b986b',
        'Accept': 'application/json'
      })
    };
    let datetimeformatted = this.formatdate();
    let urlendpoint:string = 'https://preview.webservices.fujifilmesys.com/spa/v3/Catalogs/MailOrder/categories/?GenerationDateTime='+datetimeformatted+'&fulfillerNames=MailOrder&categoryId=&removeMultiImageProducts=false&includeCustomProducts=false'
    this.http.get(urlendpoint,
                  httpOptions
      )
      .subscribe((data) => {
        console.log(data)
      });
  }

  formatdate(){

    Date.prototype.toISOString = function() {
      var tzo = -this.getTimezoneOffset(),
          dif = tzo >= 0 ? '+' : '-',
          pad = function(num) {
              var norm = Math.floor(Math.abs(num));
              return (norm < 10 ? '0' : '') + norm;
          };
      return this.getFullYear() +
          '-' + pad(this.getMonth() + 1) +
          '-' + pad(this.getDate()) +
          'T' + pad(this.getHours()) +
          ':' + pad(this.getMinutes()) +
          ':' + pad(this.getSeconds()) +
          dif + pad(tzo / 60) +
          ':' + pad(tzo % 60);
  }
  
  let dt = new Date();

  return dt.toISOString();

  }

  checkname(nickName: string){
    return this.http.post('http://localhost:8082/api/checkName',{nickName: nickName})
    .pipe(
      map(result => {        
        return result;
      })
    );   
  }
  
  getprofile(){
    return this.http.post<{}>('http://localhost:8082/api/getProfile',{})
    .pipe(
      map(result => {        
        return result;
      })
    );   
  }

  login(email: string, password: string){
      return this.http.post<{token: string}>('http://localhost:8082/api/signin', {email:email, password: password})
        .pipe(
          map(result => {
            sessionStorage.setItem('account_token', result.token);
            sessionStorage.setItem('user', JSON.stringify(result));
            console.group("Login response.");
              console.log('account_token');
              console.log(result);
              console.log(result["name"]);

              this.apiConfiguration["user"] = result;

              console.log(this.apiConfiguration["user"])
            console.groupEnd();
            
            return result;
          })
        );
  }
  
  signup(name:string,nickName:string,uuid: string,email: string, password: string): Observable<boolean> {
    console.group("Signup input.");
      console.log(name);
      console.log(nickName);
      console.log(email);
    console.groupEnd();
    sessionStorage.setItem("email",email);
    return this.http.post('http://localhost:8082/api/signup', {name:name,nickName:nickName,uuid:uuid,email:email, password: password})
      .pipe(
        map(result => {
          console.log("User created successfully");
          return true;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('account_token');
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('account_token') !== null);
  }
  

  getToken(): any {

    let account_token: string = sessionStorage.getItem(TOKEN_NAME);



    if(isNull(account_token) || account_token == "null"){
      return false;
    } else {
      return account_token;
    }

  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    console.log("Date");
    console.log(date);
    return date;
  }

  isTokenExpired(token?: any): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;    

console.log(token);

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    
    return !(date.valueOf() > new Date().valueOf());
  }

  bequest(category:string,article:string,description:string,coords:string,uuid:string): Observable<boolean> {
    console.group("Bequest input.");
      console.log(category);
      console.log(article);
      console.log(description);
      console.log(coords);
      console.log(uuid);
    console.groupEnd();
    
    return this.http.post('http://localhost:8082/api/bequest', {category:category,article:article,description:description,coords:coords, uuid: uuid})
      .pipe(
        map(result => {
          console.log("Bequest created successfully.");
          return true;
        })
      );
  }

}