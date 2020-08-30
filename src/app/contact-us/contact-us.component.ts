import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  isSubmit = false;

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.contactUsForm = this._fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      adress: ['', [Validators.required]],
      usermessage: ['', [Validators.required]]
    });
  }

  resetForm() {
    console.log(this.contactUsForm.value)
    this.contactUsForm.reset({
      adress: '',
      email: '',
      fName: '',
      lName: '',
      phoneNumber: '',
      usermessage: ''
    });
    this.contactUsForm.markAsUntouched();
    this.contactUsForm.updateValueAndValidity();
  }
  handleSubmit() {
    this.isSubmit = true;
  }
  


}
