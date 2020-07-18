import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './splash.component';
import { LandingComponent } from './ui/landing/landing.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { NucleoiconsComponent } from './ui/nucleoicons/nucleoicons.component';
import { TalkComponent } from './talk/talk.component';
import { AuthGuard } from './api/services/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PMComponent } from './pm/pm.component';

const routes: Routes =[
    { path: 'home',                 component:  SplashComponent },
    { path: 'requests',             component:  TalkComponent,    canActivate: [AuthGuard]},
    { path: 'pm',                   component:  PMComponent,      canActivate: [AuthGuard]},
    { path: 'payment/success',      component:  SplashComponent },
    { path: 'payment/failure',      component:  SplashComponent },
    { path: 'examples/landing',     component:  LandingComponent },
    { path: 'examples/profile',     component:  ProfileComponent },
    { path: 'nucleoicons',          component:  NucleoiconsComponent },
    { path: 'signup',               component:  SignupComponent },
    { path: 'login',                component:  LoginComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
