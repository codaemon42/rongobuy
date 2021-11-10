import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  isLogin = true;

  constructor(
  ) { }

  ngOnInit() {

  }

  onSendOTP(event) {
    console.log(event);
    this.isLogin = false;
  }


}
