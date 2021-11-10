import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  @Output() rbOTPVerify = new EventEmitter<{success: boolean; phone: string}>();
  invalid = false;
  message: string;
  otpForm = new FormGroup({
    phone: new FormControl(null, {
      validators: [Validators.required, Validators.pattern("^[0-9]*$")],
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

  onVerifyOTP(){
    console.log(this.otpForm);
    if(this.otpForm.valid) {
      this.rbOTPVerify.emit({
        success: true,
        phone: this.otpForm.value.phone
      });
    }
    else {
      this.rbOTPVerify.emit({
        success: false,
        phone: ''
      });
    }
  }

  inputChanged() {
    if(!this.otpForm.valid) {
      this.invalid = true;
      this.message = 'Invalid OTP number. Ex.12345...';
    }
    else{
      this.invalid = false;
      this.message = '';
    }
  }

}
