import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from '../api/services';
import { Observable as __Observable, Observable, throwError } from 'rxjs';
import { ApiConfiguration } from './api-configuration';
import { map as __map, filter as __filter, catchError, tap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  credThis: string = "";

  constructor(
    public apiConfiguration: ApiConfiguration,
    public config: ApiConfiguration,
    public http: HttpClient,
    public router: Router
  ){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiThis: string = this.apiConfiguration.rootUrl;    
        req = req.clone({
          setHeaders: {}
        });

        //Also handle errors globally
        return next.handle(req)
        .pipe(
            tap(x => x, err => {
                
                if(err.status != 200){

                    console.error(`Error performing request, status code = ${err.status}`);

                    let apiThis: string = this.apiConfiguration.rootUrl;
                    console.log(apiThis); 

                    if(err.status == 401){
                        this.router.navigate(['/login']);
                        console.log(err);
                    }else
                    if(err.status == 406){
                        this.router.navigate(['/login']);
                        console.log(err)
                    } else
                    if(err.status == 500){
                        this.router.navigate(['/login']);
                        console.log("An unknowm system error occurred.")
                    }

                } else {
                    console.log("Success");
                }

            })
            
        );
    }
    
}