import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize} from 'rxjs/operators';

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

  constructor(private _authService: AuthService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<LoginComponent>,) {
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
        confirmPassword: ['', Validators.required]
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
      // if (resp.isUserRegisted === false) {
      // this.isRegisteredMobile = false;
      // } else {
        this.isRegisteredMobile = true;
        this._authService.setUserData(resp.user);
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
      console.log(resp);
      this._authService.isLogin = true;
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
        if (this._dialogRef) {
          this._dialogRef.close();
        }
      // }
    }, (e) => {
      this.loginForm.get('password').setErrors({incorrectPassword: e.error.errorMessage });
    });
  }

}
