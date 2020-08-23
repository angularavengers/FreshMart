import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,) {
      this.initForm();
  }

  get signupForm() {
    return this.loginForm.get('signUpForm');
  }

  ngOnInit() {
  }

  initForm() {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      otp: ['', Validators.required],
      signUpForm: this.fb.group({
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
    this.step1 = false;
    this.loginForm.get('mobile').disable();
    this.loginForm.get('otp').enable();
    if (!this.isRegisteredMobile) {
      this.loginForm.get('signUpForm').enable();
    }
  }

  setStep1() {
    this.loginForm.get('mobile').enable();
    this.loginForm.get('signUpForm').disable();
    this.loginForm.get('otp').disable();
    this.step1 = true;
  }

  verify() {
    this.authService.isLogin = true;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
