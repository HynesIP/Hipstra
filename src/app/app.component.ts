import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Idle
    ]
})

export class AppComponent implements OnInit {
    
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    @ViewChild(FooterComponent) footer: FooterComponent;

    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;

    constructor( 
            private idle: Idle,         
            private renderer : Renderer2, 
            private router: Router, 
            @Inject(DOCUMENT) private document: any, 
            private element : ElementRef, 
            public location: Location
        ) {
            this.idle.setIdle(900);
            this.idle.setTimeout(30);
            this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
            this.idle.onIdleEnd.subscribe(() => this.idleState = 'Session Active');
            this.idle.onTimeout
            .subscribe(() => {

                this.idleState = '';
                this.timedOut = true;
                
                    sessionStorage.removeItem("account_token");
                    sessionStorage.removeItem("user");
                    this.router.navigateByUrl("/");

            });

            this.idle.onIdleStart
                .subscribe(() => {
                    
                    this.idleState = 'Session expired.'

                });

            this.idle.onTimeoutWarning
                .subscribe((countdown) => {
                
                    this.idleState = 'Logout in ' + countdown + 's.'
                    
                    });
            
            this.reset();
        }

    reset() {
        this.idle.watch();
        this.idleState = '';
        this.timedOut = false;
    }

    ngOnInit() {

        var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {

            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();

            this.renderer.listen('window', 'scroll', (event) => {
                const number = window.scrollY;
                var _location = this.location.path();
                _location = _location.split('/')[2];

                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
                    // remove logic
                    navbar.classList.add('navbar-transparent');
                }
            });






        });

        

    }
}
