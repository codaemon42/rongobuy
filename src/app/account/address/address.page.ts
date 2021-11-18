import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  profileForm: FormGroup;

  defaultGender = 'female';

  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change'
      }),
      email: new FormControl(null,{
        updateOn: 'change',
      }),
      birthDate: new FormControl(null, {
        updateOn: 'change'
      }),
      gender: new FormControl(this.defaultGender, {
        updateOn: 'change'
      })
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
  }


}
