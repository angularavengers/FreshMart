import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize} from 'rxjs/operators';
import { IUser } from 'app/models/user.model';
import { CartService } from 'app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordHideFlag: boolean = true;
  confirmPasswordHideFlag: boolean = true;
  isRegisteredMobile: boolean = false;
  step1: boolean;
  loginForm: FormGroup;
  userData: IUser;

  constructor(private _authService: AuthService,
    private _fb: FormBuilder,
    private _cartService: CartService,
    private _dialogRef: MatDialogRef<LoginComponent>) {
      this.initForm();
  }

  get signupForm() {
    return this.loginForm.get('signUpForm');
  }

  ngOnInit() {
    this._authService.getAllUsers().subscribe((resp) => {
      console.log(resp);
    });
  }

  initForm() {
    this.loginForm = this._fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', Validators.required],
      signUpForm: this._fb.group({
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        otp: ['', Validators.required]
      })
    });
    this.setStep1();
  }

  signInClickHandler() {
    this._authService.checkUser(this.loginForm.value).pipe(finalize(() => {
      this.step1 = false;
      this.loginForm.get('phoneNumber').disable();
      if (!this.isRegisteredMobile) {
        this.loginForm.get('signUpForm').enable();
      }
    })).subscribe((resp) => {
        this.isRegisteredMobile = resp.isUserRegisted;
        /* todo need to uncomment*/
        this.loginForm.get('password').enable();
      // }
    }, () => {
      this.isRegisteredMobile = false;
    });
  }

  setStep1() {
    this.loginForm.get('phoneNumber').enable();
    this.loginForm.get('signUpForm').disable();
    this.loginForm.get('password').disable();
    this.step1 = true;
  }

  signUpUser() {
    const data = { ...this.signupForm.value, phoneNumber: this.loginForm.get('phoneNumber').value }
    delete data.confirmPassword;
    this._authService.signUpUser(data).subscribe((resp) => {
      this._authService.isLogin = true;
      this.userData = resp.data;
      this._authService.setUserData(this.userData);
      if (this._dialogRef) {
        this._dialogRef.close();
      }
    }, (e) => {
      console.log(e);
    });
  }

  verify() {
    this.loginForm.get('phoneNumber').enable();
    this.loginForm.get('password').clearValidators();
    this._authService.validateUser(this.loginForm.value).subscribe((resp) => {
      // if (resp.authenticated === false) {
      //   this.loginForm.get('password').setErrors({incorrectPassword: true});
      // } else{
        this.loginForm.get('phoneNumber').disable();
        this._authService.isLogin = true;
        this.userData = resp.user;

        
        const newCart = {};
        resp.cartItems.forEach((v, i) => {
          newCart[v._id] = {...v, itemQuantity: this.userData.itemInCart[i].itemQuantity };
        });
        
        let localCart: any = localStorage.getItem('FreshMartCart');
        if (localCart) {
          localCart = JSON.parse(localCart);
          const localCartKeys = Object.keys(localCart);
          localCartKeys.forEach((v, i) => {
            if(!newCart[v] || newCart[v].itemQuantity !== localCart[v].itemQuantity) {
              this._cartService.addItemToCart(localCart[v], localCart[v].itemQuantity)
            }
          });
        }
        
        setTimeout(() => {
          if (localCart) {
            Object.assign(newCart, localCart);
          }
          localStorage.setItem('FreshMartCart', JSON.stringify(newCart));
          this._authService.setUserData(this.userData);
        }, 0);

        if (this._dialogRef) {
          this._dialogRef.close();
        }
      // }
    }, (e) => {
      this.loginForm.get('password').setErrors({incorrectPassword: e.error.errorMessage });
    });
  }

}
