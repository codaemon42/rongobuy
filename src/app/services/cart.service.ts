
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



    constructor() {

    }





  get cartObj() {
    return this._cartObj.asObservable();
  }

  addTOCart(){
    const newCart = new Cart(
          'string2',
          'string2',
          'string',
          'string'
    );
    //console.log(newCart);
    let cart;
    this.cartObj.pipe(take(1)).subscribe(data => {
      cart = data;
    });
      return this._cartObj.next(cart.concat(newCart));

  }

}
