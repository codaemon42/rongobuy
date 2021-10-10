/* eslint-disable max-len */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Output() rbOTPSend = new EventEmitter<{success: boolean; phone: string}>();
  invalid = false;
  message: string;
  loginForm = new FormGroup({
    phone: new FormControl(null, {
      validators: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      updateOn: 'change'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  phonenumber;
  loginSection = true;
  otpSection = false;
  successSection = false;

  constructor() { }

  ngOnInit() {}

  onReqOTP(){
    console.log(this.loginForm);
    if(this.loginForm.valid) {
      this.rbOTPSend.emit({
        success: true,
        phone: this.loginForm.value.phone
      });
    }
    else {
      this.rbOTPSend.emit({
        success: false,
        phone: ''
      });
    }
  }

  inputChanged() {
    if(!this.loginForm.valid) {
      this.invalid = true;
      this.message = 'Invalid phone number. Ex.013xxxxxxxx';
    }
    else{
      this.invalid = false;
      this.message = '';
    }
  }
}
