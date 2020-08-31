import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule,
  MatToolbarModule, MatChipsModule, MatOptionModule,
   MatGridListModule, MatProgressBarModule, MatSliderModule,
    MatSlideToggleModule, MatMenuModule, MatDialogModule,
    MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
     MatCardModule, MatIconModule, MatRadioModule,
     MatProgressSpinnerModule, MatTabsModule, MatListModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatChipsModule,
    MatOptionModule, MatGridListModule, MatProgressBarModule,
    MatSliderModule, MatSlideToggleModule, MatMenuModule, MatDialogModule,
     MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
     MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
      MatTabsModule, MatListModule, MatTableModule, MatPaginatorModule, OverlayModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule,
     MatOptionModule, MatGridListModule, MatProgressBarModule, MatSliderModule,
     MatSlideToggleModule, MatMenuModule, MatDialogModule, MatSnackBarModule, MatSelectModule,
      MatInputModule, MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule,
      MatProgressSpinnerModule, MatTabsModule, MatListModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, OverlayModule
  ],
})
export class AppMaterialModule { }
