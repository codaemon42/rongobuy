import { Subscription } from 'rxjs';
import { CartRes } from './../models/cart.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { CartsService } from '../carts/carts.service';
import { ShippingArea } from '../models/shipping.model';
import { ShippingService } from '../services/shipping.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/orders/order.service';
import { AddressService } from '../services/address/address.service';
import { AddressSingle } from '../models/address.model';
import { ToastService } from '../services/controllers/toast.service';
import { AccountService } from '../account/account.service';


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


  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private cartService: CartService,
    private addressService: AddressService,
    private accountService: AccountService,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.giftFormInit();
    this.AddressInit();
    this.cartServiceInit();
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
      this.selectedAddress = res.data.data.filter(address=>address.default === '1')[0];
    });
    this.addressSub = this.addressService.address.subscribe(addresses=>{
      this.addresses = addresses;
    });

    console.log('selected Address : ', this.selectedAddress);
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
    this.addressLoading = true;
    this.addressService.fetchAddress().subscribe(res=>{
      this.addressLoading = false;
    });
  }

  onSelectAddress(addressId) {
    this.selectedAddress = this.addresses.filter(address=>address.id===addressId)[0];
    console.log('selected Address : ', this.selectedAddress);
  }

  addNewAddress(){
    this.nav.navigateForward('account/address/add-address');
  }


  onPlacingOrder() {
    this.loadingCtrl.create({
      message: 'Placing order',
      mode: 'ios'
    }).then(el=>{
      el.present();

      this.orderService.addOrder(1).subscribe(res=>{
        this.loadingCtrl.dismiss();
        this.toastService.toast('Order placed successfully', 'success', 3000);
        this.nav.navigateForward('/all/orders');
      });
    });
  }




  // helper
  sendAsGift(event) {
    console.log('check box event : ', event);
    this.sendGift = !this.sendGift;
  }

  termsAccept(event) {
    console.log('terms event : ', event);
    this.terms = !this.sendGift;
  }


  onChangePayment(payment) {
    console.log('onchangepayment : ', payment);
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.addressSub.unsubscribe();
  }

}
