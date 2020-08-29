import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from 'app/services/http.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _httpService: HttpService,
    private _dialogRef: MatDialogRef<AddressComponent>,) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.addressForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      landMark: ['', Validators.required],
      city: [{value: 'Bhopal', disabled: true}, Validators.required],
      state: [{value: 'Madhya Pradesh', disabled: true}, Validators.required],
      pincode: [{value: '412101', disabled: true}, [Validators.required]],
      isdefault: [false],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
    if (this._data) {
        this.addressForm.patchValue(this._data);
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }

  saveAddress() {
    this._httpService.post('api/users/edituserAdress', this._authService.getUserData()).subscribe((resp => {
      console.log(resp);
    }));
  }

}
