import { Component, OnInit, Renderer2, OnDestroy, ViewChild, Inject } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { 
    Element as StripeElement,
    ElementOptions,
    ElementsOptions,
    StripeService,
    LazyStripeAPILoader,
    DocumentRef,
    PlatformService,

} from "@nomadreservations/ngx-stripe";
import { StripeCheckout, OnetimeCheckoutOptions, RecurringCheckoutOptions } from 'ngx-stripe-checkout';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
    selector: 'app-components',
    templateUrl: './splash.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class SplashComponent implements OnInit, OnDestroy {
    stripeKey = '';
    error: any;
    complete = false;
    element: StripeElement;

    cardOptions: ElementOptions = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: '#276fd3',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                    color: '#CFD7E0'
                }
            },
            invalid: {
              iconColor: '#FFC7EE',
              color: '#FFC7EE',
            }
        }
    };
  
    elementsOptions: ElementsOptions = {
      locale: 'en'
    };

    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: {year: number, month: number};
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;


    constructor( 
        private renderer : Renderer2, 
        config: NgbAccordionConfig,
        private _stripe: StripeService,
        public stripe: StripeCheckout,
        private _bottomSheet: MatBottomSheet,
        private router: Router
        ) {
        config.closeOthers = true;
        config.type = 'info';

        this.stripe.initializeStripe(`pk_test_gEBsCSok1NfVPeBLfBRQCtPz00KQpcBsbt`)
            .then((res) => console.log(res))	// Stripe Initialized
            .catch((err) => console.log(err));	// Error message
        
    }

    openDiscordDrawer(): void {
      this._bottomSheet.open(HappyPlaceDiscordBottomDrawer);
    }

    openLoginDrawer(): void {
      this._bottomSheet.open(HappyPlaceLoginBottomDrawer);
    }

    cardUpdated(result) {
        this.element = result.element;
        this.complete = result.card.complete;
        this.error = undefined;
    }

    keyUpdated() {
      this._stripe.changeKey(this.stripeKey);
    }

    getCardToken() {

      var checkoutOptions: RecurringCheckoutOptions = {
          items: [{
            plan: "price_1Gq4dEBgmwEPLtY9FKbHOGIE",
            quantity: 1
          }],
          successUrl: 'http://my.happyplacemc.com/payment/success',
          cancelUrl: 'http://my.happyplacemc.com/payment/failure'
        }
        this.stripe.openRecurringCheckout(checkoutOptions);

      /*
      this._stripe.createToken(this.element, {
        name: 'tested_ca',
        address_line1: '123 A Place',
        address_line2: 'Suite 100',
        address_city: 'Irving',
        address_state: 'BC',
        address_zip: 'VOE 1H0',
        address_country: 'CA'
      }).subscribe(result => {
        // Pass token to service for purchase.
        console.log(result);
      });
      */
    }
    
    goLogin(): void {
      this.router.navigate(['/login']);
    }

    goCreate(): void {
      this.router.navigate(['/signup']);
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;



    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
        

    }
    showSuccess: boolean;
    showCancel: boolean;
    showError: boolean;
    resetStatus(){}


       




    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    
}

@Component({
  selector: 'happy-place-discord-bottom-sheet',
  template: `
  <div style="text-align: center;">
    <iframe src="https://discord.com/widget?id=719598845046161488&theme=light&username=Termon8" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>
  </div>
  `,
  providers: [
    MatList
  ]
})
export class HappyPlaceDiscordBottomDrawer {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<HappyPlaceDiscordBottomDrawer>,
    public matList: MatList
    
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }



}

@Component({
  selector: 'happy-place-login-bottom-sheet',
  template: `
  <div style="text-align: center;height:222px;">
    <app-widget-login></app-widget-login>
  </div>
  `,
  providers: [
    MatList
  ]
})
export class HappyPlaceLoginBottomDrawer {
  constructor(
      private _bottomSheetRef: MatBottomSheetRef<HappyPlaceLoginBottomDrawer>,
      public matList: MatList
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}