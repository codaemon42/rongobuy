import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartRes } from './../models/cart.model';
import { CartsService } from './carts.service';
import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/controllers/toast.service';
import { CouponService } from '../services/coupon/coupon.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit, OnDestroy {
  layout = 'horizontal';
  carts;
  subTotal;
  cartDetails: CartRes = null;
  cartSub: Subscription;

  couponForm: FormGroup;

  constructor(
    private breakpoint: BreakpointObserverService,
    private nav: NavController,
    private cartService: CartService,
    private cartsService: CartsService,
    private couponService: CouponService,
    private toastService: ToastService
    ) {
      this.carts = this.cartsService.carts;
     }

  ngOnInit() {
    this.getLayout();
    this.couponInit();
  }
  couponInit() {
    this.couponForm = new FormGroup({
      coupon: new FormControl(null, {
        updateOn: 'change'
      })
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
          this.toastService.toast('coupon successfully applied', 'success');
        }
      });
    }
  }
  ionViewWillEnter(){
    console.log('cart view will enter');
    this.cartService.fetchCartObj().subscribe();
    this.cartSub = this.cartService.cartDetails.subscribe(res=> {
      if(res) {
        this.cartDetails = res;
        this.carts = res.data.product;
      }
    });
  }

  getLayout(){
    this.breakpoint.size.subscribe((data)=>{
      console.log(data);
      if(data === 'sm' || data === 'md' || data === 'lg' || data === 'xl'){
        this.layout = 'vertical';
      }
      else {
        this.layout = 'horizontal';
      }
    });
  }

  onProceedCheckout() {
    this.nav.navigateForward('checkout');
    console.log('next');
  }

  increaseCart(productId, skuId, quantity, backgroundImage, phoneDesignId){
    console.log(productId);
    this.increaseQuantity(productId);
    this.cartService.addTOCart(productId, skuId, quantity, backgroundImage , phoneDesignId).subscribe();
  }

  decreaseCart(productId, skuId, quantity, backgroundImage, phoneDesignId){
    console.log(productId, quantity);
    this.decreaseQuantity(productId).then(bool=>{
      if(bool) {
        this.cartService.addTOCart(productId, skuId, quantity, backgroundImage , phoneDesignId).subscribe();
      } else{
        return;
      }
    });
  }



  // helpers

  increaseQuantity(productId) {
      this.cartDetails.data.product.map(cartItem => {
        if(cartItem.productId === productId ) {
          // this.cartDetails.data.subtotal += cartItem.discountedPrice;
          console.log('naims cart subtotal : ', this.cartDetails.data.subtotal);
          cartItem.quantity++;
          //cartItem.discountedPrice = cartItem.orginalPrice*cartItem.quantity;
          this.cartDetails.data.subtotal += cartItem.orginalPrice;
          this.cartDetails.data.grandTotal += cartItem.orginalPrice;
          return;
        }
      });
  }

  decreaseQuantity(productId) {
    return new Promise(resolve=>{
      this.cartDetails.data.product.map(cartItem => {
        if(cartItem.productId === productId ) {
          if(cartItem.quantity <= 1){
            resolve(false);
            return;
          }
          else {
            cartItem.quantity--;
            //cartItem.discountedPrice = cartItem.orginalPrice*cartItem.quantity;
            this.cartDetails.data.subtotal -= cartItem.orginalPrice;
            this.cartDetails.data.grandTotal -= cartItem.orginalPrice;
            resolve(true);
            return;
          }
        }
      });
    });
  }

  onDeleteCartItem(cartId) {
    this.cartService.deleteCartItem(cartId).subscribe();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
