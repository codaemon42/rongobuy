import { CartsService } from './carts.service';
import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit {
  layout = 'horizontal';
  carts;
  subTotal;

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
    this.calcSubTotal();
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

  onCart() {
    this.nav.navigateForward('checkout');
    console.log('next');
  }

  increaseCart(index){
    console.log(index);
    const qty = this.increaseQuantity(index);
    this.cartsService.changeCartQty(index, qty);
    this.calcSubTotal();
  }

  decreaseCart(index){
    console.log(index);
    const qty = this.decreaseQuantity(index);
    this.cartsService.changeCartQty(index, qty);
    this.calcSubTotal();
  }



  // helpers

  increaseQuantity(i) {
    this.carts[i].qty += 1;
    return this.carts[i].qty;
  }

  decreaseQuantity(i) {
    if ( this.carts[i].qty !== 1) {
      this.carts[i].qty -= 1;
    }
    return this.carts[i].qty;
  }

  calcSubTotal() {
    this.subTotal = this.cartsService.subTotal();
  }
}
