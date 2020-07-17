/* tslint:disable */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})

export class ApiConfiguration {
  constructor(
      public router: Router 
    ) {}

  rootUrl: string = 'mongo'; 
  targetShape: any = [];
  targetData: any = [];
  targetName: string = "";
  sessionInit: boolean = false;
  loading: boolean = false;
  pageviewInit: boolean = false;

}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
