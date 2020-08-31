import { MatIconModule } from '@angular/material';
import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { QtyPlusMinusComponent } from './qty-plus-minus/qty-plus-minus.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { CartComponent } from './cart/cart.component';
import { Authguard } from './services/auth-guard.servicec';
import { ImagepopupComponent } from './imagepopup/imagepopup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddressComponent } from './address/address.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderStepsComponent } from './order-steps/order-steps.component';
import { PageSpinnerComponent } from './page-spinner.component/page-spinner.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent, canActivate: [ Authguard ]},
  {path: 'order-summary', component: OrderSummaryComponent, canActivate: [ Authguard ]},
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
      AboutUsComponent,
      HomeComponent,
      LoginComponent,
      QtyPlusMinusComponent,
      NumberOnlyDirective,
      CartComponent,
      ImagepopupComponent,
      ContactUsComponent,
      OrderSummaryComponent,
      AddressComponent,
      OrderStepsComponent,
      PageSpinnerComponent],
  entryComponents: [ImagepopupComponent, AddressComponent],
  bootstrap: [AppComponent],
  exports: [AppMaterialModule],
  providers: []
})
export class AppModule { }
