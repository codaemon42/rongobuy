import { HttpClient, HttpHeaders } from '@angular/common/http';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  cartTotal: number;

  _cartObj = new BehaviorSubject<Cart[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  get cartObj() {
    return this._cartObj.asObservable();
  }

  addTOCart(cartItem: Cart){
    let genericId;
    const newCart = new Cart(
      null,
      cartItem.product_id,
      cartItem.product_title,
      cartItem.product_description,
      cartItem.unitPrice,
      cartItem.qty,
      cartItem.mainImage,
      cartItem.image
    );
    //console.log(newCart);
    let cart;
    return this.cartObj.pipe(
      switchMap(resData => {
        cart = resData;
        genericId = Math.round(Math.random()*10);
        return this.cartObj;
      }),
      take(1),
      delay(2000),
      tap( cartItems => {
        newCart.id = genericId;
        this._cartObj.next(cartItems.concat(newCart));
      })
    );
    // .subscribe(data => {
    //   cart = data;
    // });
      // return this._cartObj.next(cart.concat(newCart));
  }

}
