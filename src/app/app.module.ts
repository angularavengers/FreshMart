import { MatIconModule } from '@angular/material';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { ImportantContactComponent } from './important-contact/important-contact.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { QtyPlusMinusComponent } from './qty-plus-minus/qty-plus-minus.component';
import { NumberOnlyDirective } from './directives/number-only.directive';

const routes: Routes = [
  {path: 'caronaHelpLine' , component: HomeComponent},
  {path: 'requestFood' , component: HomeComponent},
  {path: 'donateFood' , component: HomeComponent},
  {path: 'petFood' , component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  declarations: [AppComponent,
      ImportantContactComponent,
      HomeComponent,
      LoginComponent,
      QtyPlusMinusComponent,
      NumberOnlyDirective],
  entryComponents: [],
  bootstrap: [AppComponent],
  exports: [AppMaterialModule],
  providers: []
})
export class AppModule { }
