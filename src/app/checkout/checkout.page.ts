import { ParamShippingCost } from './../models/address.model';
import { OrderVideoComponent } from './../components/video/order-video/order-video.component';
import { Subscription } from 'rxjs';
import { CartRes } from './../models/cart.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/orders/order.service';
import { AddressService } from '../services/address/address.service';
import { AddressSingle } from '../models/address.model';
import { ToastService } from '../services/controllers/toast.service';
import { AccountService } from '../account/account.service';
import { StorageService } from '../services/storage.service';
import { CouponService } from '../services/coupon/coupon.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit, OnDestroy {

  giftForm: FormGroup;
  sendGift = false;
  terms = false;

  cartSub: Subscription;
  cartDetails: CartRes;
  cartLoading = true;

  addressSub: Subscription;
  addresses: AddressSingle[];
  selectedAddress: AddressSingle = null;
  addressLoading = true;

  shippingCost: number;

  couponRes: CartRes = null;
  couponSub: Subscription;


  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private cartService: CartService,
    private addressService: AddressService,
    private accountService: AccountService,
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private couponService: CouponService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    if(this.modalCtrl){
      this.modalCtrl.dismiss();
    }
    this.couponInit();
    this.giftFormInit();
    this.AddressInit();
    this.cartServiceInit();
  }

  couponInit(){
    this.couponSub = this.couponService.couponCode.subscribe(couponRes=>{
      this.couponRes = couponRes;
    });
  }

  giftFormInit() {
    this.giftForm = new FormGroup({
      message: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      sender: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  AddressInit() {
    this.addressLoading = true;
    this.addressService.fetchAddress().subscribe(res=>{
      this.addressLoading = false;
      if(res.data.data.length === 0){
        //
      } else {
        this.selectedAddress = res.data.data.filter(address=>address.default === '1')[0];
        if(!this.selectedAddress) {
          this.selectedAddress = res.data.data[0];
        }
        console.log('selected Address : ', this.selectedAddress);
        this.getShippingCost({city: this.selectedAddress.city, area: this.selectedAddress.area});
      }
    });
    this.addressSub = this.addressService.address.subscribe(addresses=>{
      this.addresses = addresses;
    });

  }

  cartServiceInit() {
    this.cartLoading = true;
    this.cartService.fetchCartObj().subscribe(res=>{
      this.cartLoading = false;
    });
    this.cartSub = this.cartService.cartDetails.subscribe(res=>{
      this.cartDetails = res;
    });
  }

  ionViewWillEnter(){
    this.cartLoading = true;
    this.cartService.fetchCartObj().subscribe(res=>{
      this.cartLoading = false;
    });
    console.log('cart ion view');
    this.AddressInit();
  }

  onSelectAddress(addressId) {
    this.selectedAddress = this.addresses.filter(address=>address.id===addressId)[0];
    this.getShippingCost({city: this.selectedAddress.city, area: this.selectedAddress.area});
    console.log('selected Address : ', this.selectedAddress);
  }

  addNewAddress(){
    this.authService.addReferrer('/checkout');
    this.nav.navigateForward('tabs/account/address/add-address');
  }

  async modal() {
    const modal = await this.modalCtrl.create({
        component: OrderVideoComponent,
        keyboardClose: false,
        swipeToClose: false,
        backdropDismiss: false
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    return new Promise(resolve => {
      resolve(data);
    });
  }


  onPlacingOrder() {
    this.storageService.get('first_order_completed').then(firstOrder=>{
      if(firstOrder){
        console.log('first_order true');
        this.loadingCtrl.create({
          message: 'Placing order',
          mode: 'ios'
        }).then(el=>{
          el.present();
        });
        this.processOrder();
      } else {
        console.log('first_order false|null');
        this.modal().then(data=>{
          if(data['confirm']){
            this.loadingCtrl.create({
              message: 'Placing order',
              mode: 'ios'
            }).then(el=>{
              el.present();
            });
            this.processOrder();
          }
        });
      }
    });
  }






  // helper
  getShippingCost(body: ParamShippingCost){
    this.addressService.getShippingCost(body).subscribe(shippingRes=>{
      this.shippingCost = parseInt(shippingRes.data,10);
    });
  }
  processOrder(){
    let gift = 0;
    let message = '';
    let from = '';
    let couponCode = '';
    if(this.couponRes){
      if(this.couponRes.success){
        couponCode = this.couponRes.data.couponCode;
      }
    }
    if ( this.sendGift ) {
      gift = 1;
      message = this.giftForm.value.message;
      from = this.giftForm.value.from;
    }
    this.orderService.addOrder(this.selectedAddress.id, couponCode, gift, message, from).subscribe(res=>{
      this.loadingCtrl.dismiss();
      this.toastService.toast('Order placed successfully', 'success', 3000);
      this.nav.navigateForward('/all/orders');
    });
  }
  sendAsGift(event) {
    console.log('check box event : ', event);
    this.sendGift = !this.sendGift;
  }

  termsAccept(event) {
    console.log('terms event : ', event);
    this.terms = !this.terms;
    console.log('terms : ', this.terms);
  }


  onChangePayment(payment) {
    console.log('onchangepayment : ', payment);
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.addressSub.unsubscribe();
    this.couponSub.unsubscribe();
  }

}
