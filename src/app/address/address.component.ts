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
  isEdit: boolean;
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
      delPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
    if (this._data) {
        this.addressForm.patchValue(this._data);
        this.isEdit = true;
    }
  }

  closeDialog() {
    this._dialogRef.close();
  }

  saveAddress() {
    const address = {
      ...this.addressForm.value,
      phoneNumber: this._authService.getUserData().phoneNumber
    };
    this._httpService.post('api/users/addUserAddress', address).subscribe((resp => {
      this._authService.setUserData(resp.updatedrecord);
      this.closeDialog();
      console.log(resp);
    }));
  }

  updateAddress() {
    const address = {
      ...this.addressForm.value,
      addressId:this._data._id,
      phoneNumber: this._authService.getUserData().phoneNumber
    };
    this._httpService.post('api/users/updateUserAddress', address).subscribe((resp => {
      this._authService.setUserData(resp.updatedrecord);
      this.closeDialog();
      console.log(resp);
    }));
  }

}
