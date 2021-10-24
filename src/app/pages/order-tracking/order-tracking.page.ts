/* eslint-disable max-len */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.page.html',
  styleUrls: ['./order-tracking.page.scss'],
})
export class OrderTrackingPage implements OnInit {

  invalidMessage = 'Order number is invalid';
  orderTrack = new FormGroup({
    orderNumber: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';


  constructor( private nav: NavController, private toastCtrl: ToastController) { }

  ngOnInit() {}

  onOrderTrack(){
    console.log(this.orderTrack);
    if(this.orderTrack.valid) {
      console.log(('phone: '), this.orderTrack.value.orderNumber);
      this.nav.navigateForward(`/orders/${this.orderTrack.value.orderNumber}`);
    }
    else {
      console.log('invalid order track');
      this.toastCtrl.create({
        message: this.invalidMessage,
        position: 'top',
        color: 'danger',
        duration: 4000
      }).then(toastEl=> {
        toastEl.present();
      });
    }
  }

}
