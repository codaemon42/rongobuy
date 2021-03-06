import { ToastService } from './../services/controllers/toast.service';
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
import { AccountService } from './account.service';

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  @Input() isFromCustom;
  isLogin = true;
  enableResend = false;
  phoneNumber;
  loginEvent;
  referrer: string;
  counter = 100;
  refCounter = 100;
  timer;
  userLoggedIn = false;
  bgContent = 'https://media.rongobuy.com/p/product/wyg3ubxo4kmnq2h0d9i5fpascj16tv.png';

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private nav: NavController,
    private storageService: StorageService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    console.log('user token : ', await this.storageService.get('_userToken'));
    this.loggedInController();
    this.authService.referrer.subscribe(ref=>{
      this.referrer = ref;
      if(ref !== '') {
        this.toastService.toast('Please login to use all features', 'tertiary');
      }
      console.log('ref from acc page : ', ref);
    });
  }

  ionViewWillEnter(){
    this.loggedInController();
  }

  onSendOTP(event) {
    this.enableResend = false;
    console.log(event);
    this.loginEvent = event;
    this.phoneNumber = event.phone;
    if(event.success) {
      this.loadingCtrl.create({message: 'Sending OTP ...', mode: 'ios'}).then(el=>el.present());
      this.authService.loginWithOtp(event.phone).then( res =>{
          const resp: any = res;
          this.loadingCtrl.dismiss();
        if(resp.success) {
          this.toastService.toast(`OTP has been sent to ${event.phone}`, 'success', 2000);
          console.log('success login submit');
          this.isLogin = false;
          this.startOTPCountdown();
        }
        else{
          this.toastService.toast(`OTP failed`, 'danger', 2000);
          console.log('failure login submit');
          this.isLogin = true;
        }
      });
    } else {
      this.isLogin = true;
      this.toastService.toast('invalid phone number', 'danger', 2000);
    }
  }

  onVerifyOTP(event) {
    console.log('onVerifyOTP : ', event);
    this.loadingCtrl.create({message: 'verifying OTP ...', mode: 'ios'}).then(el=>el.present());
    if(event.success) {
      this.authService.checkOTP(this.phoneNumber, event.code).then( res=>{
        const resp: any = res;
        this.loadingCtrl.dismiss();
          if(resp.success) {
            this.toastService.toast('logged in successfully', 'success', 2000);
            this.stopOTPCountdown();
            this.accountService.logIn(resp.data.access_token);
            this.accountService.storeToken(resp.data.access_token);
            console.log('successfully logged from account page');
            this.userLoggedIn = true;
            if(this.isFromCustom){
              // dismiss modal
              this.modalCtrl.dismiss({loggedIn: true});
            }
            else {
              this.nav.navigateForward(this.referrer);
            }
          } else {
            this.toastService.toast('invalid otp executed');
          }
      });
    }
  }

  onOTPResend() {
    this.enableResend = false;
    console.log('resend');
    this.stopOTPCountdown();
    //this.startOTPCountdown();
    this.onSendOTP(this.loginEvent);
  }

  loggedInController() {
      this.userLoggedIn = this.accountService.isLoggedIn();
      if(!this.userLoggedIn) {
        this.isLogin = true;
        this.bgContent = 'url('+'https://media.rongobuy.com/p/product/wyg3ubxo4kmnq2h0d9i5fpascj16tv.png'+') no-repeat';
      } else {
        this.isLogin = false;
        this.bgContent = '#fff';
      }
  }

  startOTPCountdown(){
    this.timer = setInterval(()=>{
      console.log(this.counter);
      this.counter--;
      if(this.counter <= 0) {
        this.enableResend = true;
        this.counter = this.refCounter;
        clearInterval(this.timer);
      }
    },1000);
  }
 stopOTPCountdown() {
    clearInterval(this.timer);
    this.timer = null;
    this.counter = this.refCounter;
 }

 dismissModal(){
   this.modalCtrl.dismiss({loggedIn: false});
 }

}
