import { AddAddressPage } from './../../account/address/add-address/add-address.page';
import { StorageService } from './../../services/storage.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { OrderVideoComponent } from 'src/app/components/video/order-video/order-video.component';
import { AddressSingle, ParamShippingCost } from 'src/app/models/address.model';
import { CartRes } from 'src/app/models/cart.model';
import { AddressService } from 'src/app/services/address/address.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CouponService } from 'src/app/services/coupon/coupon.service';

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
  @Input() phoneModel;

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

  singleProduct: Product;
  productPrice = 0;
  isProductLoading = true;

  couponRes: CartRes = null;
  couponSub: Subscription;

  couponForm: FormGroup;


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
    private productService: ProductService,
    private couponService: CouponService,
    ) { }

  ngOnInit() {
    this.couponInit();
    this.productInit();
    this.giftFormInit();
    this.addressInit();
    this.cartServiceInit();
    console.log(
        this.mainImage, this.backgroundImage,
        this.logoImage ,
        this.text,
    );
  }

  couponInit() {
    this.couponSub = this.couponService.couponCode.subscribe(couponRes=>{
      this.couponRes = couponRes;
    });
    this.couponForm = new FormGroup({
      coupon: new FormControl(null, {
        updateOn: 'change'
      })
    });
  }

  productInit() {
    this.isProductLoading = true;
    this.productService.fetchSingleProduct('customized').subscribe(res=>{
      this.singleProduct = res;
      this.isProductLoading = false;
      console.log('this.singleProduct custom check : ',this.singleProduct);
      this.productPrice = parseInt(this.singleProduct.productPrice, 10);
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

  addressInit() {
    this.addressLoading = true;
    this.addressService.fetchAddress().subscribe(res=>{
      this.addressLoading = false;
      if(res.data.data.length === 0){
        //
      } else {
        this.selectedAddress = res.data.data.filter(address=>address.default === '1')[0];
        if(!this.selectedAddress){
          this.selectedAddress = res.data.data[0];
        }
        this.getShippingCost({city: this.selectedAddress.city, area: this.selectedAddress.area});
      }
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
    this.productInit();
    this.addressInit();

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
    this.getShippingCost({city: this.selectedAddress.city, area: this.selectedAddress.area});
    console.log('selected Address : ', this.selectedAddress);
  }

  addNewAddress(){
    //this.nav.navigateForward('account/address/add-address');
    this.modalForAddress().then(data=>{
      if(data['closed']){
        this.addressInit();
      }
      console.log('modal address dismissed', data);
    });
  }

    applyCoupon() {
    if(!this.couponForm.valid) {
      this.toastService.toast('coupon is not valid');
    } else {
      this.couponService.applyCoupon(this.couponForm.value.coupon).subscribe(res=>{
        console.log('got the coupon res : ', res);
        if(!res.success){
          this.toastService.toast(res.message);
        } else {
          this.couponRes = res;
          this.toastService.toast('coupon successfully applied', 'success');
        }
      });
    }
  }

  async modalForVideo() {
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

    async modalForAddress() {
    const modal = await this.modalCtrl.create({
        component: AddAddressPage,
        componentProps: {
          fromModal: true
        },
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

    this.storageService.get('first_order_completed').then(firstOrder=>{
      if(firstOrder){
        console.log('first_order true');
        this.loadingCtrl.create({
          message: 'Placing order',
          mode: 'ios'
        }).then(el=>{
          el.present();
          this.processOrder(gift);
        });
      }
      else{
        console.log('first_order false|null');
        this.modalForVideo().then(data=>{
          if(data['confirm']){
            this.loadingCtrl.create({
              message: 'Placing order',
              mode: 'ios'
            }).then(el=>{
              el.present();
            });
            this.processOrder(gift);
          }
        });
      }
    });
  }

  processOrder(gift){
        let couponCode = '';
        if(this.couponRes){
          if(this.couponRes.success){
            couponCode = this.couponRes.data.couponCode;
          }
        }
        this.orderService.addCustomOrder(
        this.selectedAddress.id,
        this.mainImage, this.backgroundImage,
        this.logoImage ,
        this.text,
        gift.isGift,
        gift.message,
        gift.from,
        couponCode,
        this.phoneModel ).subscribe(res=>{
        console.log('custom order res : ', res);
        this.loadingCtrl.dismiss();
        this.modalCtrl.dismiss();
        this.toastService.toast('Order placed successfully', 'success', 3000);
        this.nav.navigateForward('/all/orders');
      });
  }


  // helper
  getShippingCost(body: ParamShippingCost){
    this.addressService.getShippingCost(body).subscribe(shippingRes=>{
      this.shippingCost = parseInt(shippingRes.data,10);
      console.log('shipped');
    });
  }
  sendAsGift(event) {
    console.log('check box event : ', event);
    this.sendGift = !this.sendGift;
  }

  termsAccept(event) {
    console.log('terms event : ', event);
    this.terms = !this.terms;
  }

  onChangePayment(payment) {
    console.log('on change payment : ', payment);
  }



  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.addressSub.unsubscribe();
  }


}
