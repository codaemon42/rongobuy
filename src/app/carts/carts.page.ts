import { Subscription } from 'rxjs';
import { CartRes } from './../models/cart.model';
import { CartsService } from './carts.service';
import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

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

  constructor(
    private breakpoint: BreakpointObserverService,
    private nav: NavController,
    private cartService: CartService,
    private cartsService: CartsService
    ) {
      this.carts = this.cartsService.carts;
     }

  ngOnInit() {
    this.getLayout();
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

  increaseCart(productId, quantity){
    const skuId = productId+'-green';
    console.log(productId);
    this.increaseQuantity(productId);

    this.cartService.addTOCart(productId, skuId, quantity).subscribe();
  }

  decreaseCart(productId, quantity){
    const skuId = productId+'-green';
    console.log(productId, quantity);
    this.decreaseQuantity(productId);
    this.cartService.addTOCart(productId, skuId, quantity).subscribe();
  }



  // helpers

  increaseQuantity(productId) {
    this.cartDetails.data.product.map(cartItem => {
      if(cartItem.productId === productId ) {
        // this.cartDetails.data.subtotal += cartItem.discountedPrice;
        console.log('naims cart subtotal : ', this.cartDetails.data.subtotal);
        cartItem.quantity++;
        cartItem.discountedPrice = cartItem.orginalPrice*cartItem.quantity;
        this.cartDetails.data.subtotal += cartItem.orginalPrice;
        this.cartDetails.data.grandTotal += cartItem.orginalPrice;
        return;
      }
    });
  }

  decreaseQuantity(productId) {
    this.cartDetails.data.product.map(cartItem => {
      if(cartItem.productId === productId ) {
        cartItem.quantity--;
        cartItem.discountedPrice = cartItem.orginalPrice*cartItem.quantity;
        this.cartDetails.data.subtotal -= cartItem.orginalPrice;
        this.cartDetails.data.grandTotal -= cartItem.orginalPrice;
        return;
      }
    });
  }

  onDeleteCartItem(cartId) {
    this.cartService.deleteCartItem(cartId).subscribe();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
