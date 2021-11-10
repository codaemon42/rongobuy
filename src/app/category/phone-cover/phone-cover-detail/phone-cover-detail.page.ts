import { PhoneCover } from './../../../models/phone-cover.model';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';

@Component({
  selector: 'app-phone-cover-detail',
  templateUrl: './phone-cover-detail.page.html',
  styleUrls: ['./phone-cover-detail.page.scss'],
})
export class PhoneCoverDetailPage implements OnInit {

  phoneCovers: PhoneCover[];
  isDisplay = false;

  constructor(
    private loadingCtrl: LoadingController,
    private phoneCoverService: PhoneCoverService
  ) { }

  ngOnInit() {
    //this.closeLoader();
    this.fetchPhoneCovers();
  }

  closeLoader() {
    this.loadingCtrl.dismiss();
  }

  onSelectImage() {
    this.isDisplay = true;
  }

  fetchPhoneCovers() {
    this.phoneCoverService.phoneCovers.subscribe(data => {
      this.phoneCovers = data;
      console.log('this fn cover : ', this.phoneCovers);
    });
    this.phoneCoverService.fetchPhoneCoversByFilter().subscribe(data=>{
      console.log('fetch fn covers : ', data);
    });
  }

}
