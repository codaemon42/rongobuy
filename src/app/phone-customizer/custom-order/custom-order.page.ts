import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { AddressSingle } from 'src/app/models/address.model';
import { CartRes } from 'src/app/models/cart.model';
import { AddressService } from 'src/app/services/address/address.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.page.html',
  styleUrls: ['./custom-order.page.scss'],
})
export class CustomOrderPage implements OnInit, OnDestroy {
  @Input() mainImage;
  @Input() backgroundImage;
  @Input() logoImage;
  @Input() text;

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
    this.addressInit();
    this.cartServiceInit();
    console.log(
        this.mainImage, this.backgroundImage,
        this.logoImage ,
        this.text,
    );
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

  addressInit() {
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
    const gift = {
      isGift: 0,
      message: '',
      from: ''
    };

    if(this.sendGift){
      gift.isGift = 1;
      gift.message = this.giftForm.value.message;
      gift.from = this.giftForm.value.sender;
    }

    this.loadingCtrl.create({
      message: 'Placing order',
      mode: 'ios'
    }).then(el=>{
      el.present();

      this.orderService.addCustomOrder(
        this.selectedAddress.id,
        this.mainImage, this.backgroundImage,
        this.logoImage ,
        this.text,
        gift.isGift,
        gift.message,
        gift.from ).subscribe(res=>{
        console.log('custom order res : ', res);
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
    console.log('on change payment : ', payment);
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.addressSub.unsubscribe();
  }


}
