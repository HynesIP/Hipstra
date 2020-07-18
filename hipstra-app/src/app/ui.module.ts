import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { RouterModule } from '@angular/router';
import { BasicelementsComponent } from './ui/basicelements/basicelements.component';
import { NavigationComponent } from './ui/navigation/navigation.component';
import { TypographyComponent } from './ui/typography/typography.component';
import { NucleoiconsComponent } from './ui/nucleoicons/nucleoicons.component';
import { NotificationComponent } from './ui/notification/notification.component';
import { NgbdModalBasic } from './ui/modal/modal.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  } from '@angular/material/index';
  */
 @NgModule({
    exports: [
      // CDK
      /*
      A11yModule,
      BidiModule,
      ObserversModule,
      OverlayModule,
      PlatformModule,
      PortalModule,
      ScrollDispatchModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule,
      */
      // Material
      /*
      MatAutocompleteModule,
      MatBadgeModule,
      */
      MatBottomSheetModule,
      /*
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      */
      MatListModule
      /*
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      */
    ]
  })
  export class MaterialModule {}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        MatBottomSheetModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalBasic
    ],
    providers: [
        {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ]
})
export class UIModule { }
