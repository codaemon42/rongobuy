import { CartRes } from './../models/cart.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { CartsService } from '../carts/carts.service';
import { ShippingArea } from '../models/shipping.model';
import { ShippingService } from '../services/shipping.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/orders/order.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit {
  subTotal: number;
  grandTotal;
  paymentMethod: any = 'cod';
  area: ShippingArea[];
  selectedArea: ShippingArea;
  checkoutForm = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(11), Validators.minLength(11)]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
  });
  giftForm = new FormGroup({
    message: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    sender: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required]
    })
  });
  sendGift = false;
  cartDetails: CartRes;
  cartLoading = true;
  constructor(
    private nav: NavController,
    private shippingService: ShippingService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private cartsService: CartsService,
    private cartService: CartService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.selectedArea = {
      name: null,
      code: null,
      cost: '60'
    };
    this.subTotal = this.cartsService.subTotal();
    this.calcGrandTotal();
    this.dynamicForm();
    this.area = this.shippingService.getArea();
    this.cartServiceInit();
  }

  ionViewWillEnter(){
    this.cartServiceInit();
  }

  cartServiceInit() {
    this.cartLoading = true;
    this.cartService.fetchCartObj().subscribe(res=>{
      this.cartLoading = false;
    });
    this.cartService.cartDetails.subscribe(res=>{
      this.cartDetails = res;
    });
  }



  onPlacingOrder() {
    //this.nav.navigateForward('checkout/thankyou');
    console.log(this.selectedArea);
    console.log(this.checkoutForm);
    console.log(this.giftForm.value);
    console.log('paymentMethod : ', this.paymentMethod);
    this.loadingCtrl.create({
      message: 'Placing order',
      mode: 'ios'
    }).then(el=>{
      el.present();

      this.orderService.addOrder(1).subscribe(res=>{
        this.loadingCtrl.dismiss();
        this.nav.navigateForward('/all/orders');
        this.toastCtrl.create({
          message: 'Order placed successfully',
          color: 'success',
          duration: 3000,
          position: 'top'
        }).then(toastEl=>{
          toastEl.present();
        });
      });

      // setTimeout(()=>{
      // }, 3000);
    });
  }





  // helpers

  calcGrandTotal(){
    this.grandTotal = this.subTotal + parseInt(this.selectedArea.cost, 10);
  }

  onChangeArea() {
    this.calcGrandTotal();
    this.checkoutForm.patchValue({area: this.selectedArea.name});
    this.checkoutForm.patchValue({shipping_cost: this.selectedArea.cost});
  }

  onChangePayment(paymentMethod){
    console.log(this.checkoutForm.controls.payment.value);
    this.checkoutForm.patchValue({payment: paymentMethod});
    console.log(this.checkoutForm.controls.payment.value);
  }

  formButtonDisabler(){
    if(!this.checkoutForm.valid && (this.selectedArea.name !== undefined || this.selectedArea.name !== null)){
      console.log('active button');
      return true;
    }
    return false;
  }

  dynamicForm(){
    this.checkoutForm.addControl('area', new FormControl(this.selectedArea.name, {
      updateOn: 'change',
      validators: [Validators.required]
    }));

    this.checkoutForm.addControl('payment', new FormControl('cod', {
      updateOn: 'change',
      validators: [Validators.required]
    }));

    this.checkoutForm.addControl('shipping_cost', new FormControl(this.selectedArea.name, {
      updateOn: 'change',
      validators: [Validators.required]
    }));

  }




  // helper
  sendAsGift(event) {
    console.log('check box event : ', event);
    this.sendGift = !this.sendGift;
  }

}
