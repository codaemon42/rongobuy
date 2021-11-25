import { LoadingController } from '@ionic/angular';
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../services/controllers/toast.service';
import { OrderService } from '../../services/orders/order.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.page.html',
  styleUrls: ['./order-tracking.page.scss'],
})
export class OrderTrackingPage implements OnInit {

  invalidMessage = 'Order number is invalid';
  showStatus = false;
  statusRes = null;
  orderTrack = new FormGroup({
    phoneNumber: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    orderNumber: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    })
  });

  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';


  constructor( private nav: NavController, private toastService: ToastService, private orderService: OrderService, private loadingCtrl: LoadingController ) { }

  ngOnInit() {}

  onOrderTrack(){
    this.showStatus = false;
    console.log(this.orderTrack);
    if(this.orderTrack.valid) {
      console.log(('phone: '), this.orderTrack.value.orderNumber);
      this.loadingCtrl.create({
        message: 'tracking your order',
      }).then(el=>el.present());
      this.orderService.trackOrder(this.orderTrack.value.orderNumber, this.orderTrack.value.phoneNumber).subscribe(orderRes=>{
        this.loadingCtrl.dismiss();
        if(orderRes.success) {
          this.showStatus = true;
          this.statusRes = orderRes;
        } else {
          this.toastService.toast('invalid phone number and order number', 'danger', 2000);
        }
      });
      //this.nav.navigateForward(`/orders/${this.orderTrack.value.orderNumber}`);
    }
    else {
      console.log('invalid order track');
      this.toastService.toast(this.invalidMessage, 'danger', 3000);
    }
  }

}
