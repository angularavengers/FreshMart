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
  step1: boolean = true;

  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,) {
      this.initForm();
    }

  ngOnInit() {
  }

  initForm() {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required],
      otp: ['', Validators.required],
      signUpForm: this.fb.group({
        fName: ['', Validators.required],
        lName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })
    });
    this.loginForm.get('signUpForm').disable();
  }

  signInClickHandler() {
    this.step1 = false;
    this.loginForm.get('mobile').disable();
    if (!this.isRegisteredMobile) {
      this.loginForm.get('signUpForm').enable();
    }
  }

  verify() {
    this.authService.isLogin = true;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
