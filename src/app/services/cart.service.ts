import { NavController } from '@ionic/angular';

import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartAddRes, CartProduct, CartRes } from '../models/cart.model';
import { take, map, tap, delay, switchMap, catchError } from 'rxjs/operators';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  cartTotal: number;

  // _cartObj = new BehaviorSubject<CartProduct[]>([]);

  _cartDetails = new BehaviorSubject<CartRes>(null);

  _cartTotalItems = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private nav: NavController
  ) { }

  // get cartObj() {
  //   return this._cartObj.asObservable();
  // }

  get cartDetails() {
      return this._cartDetails.asObservable();
  }

  get cartTotalItems() {
        return this._cartTotalItems.asObservable();
  }


  fetchCartObj() {
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };

    return this.http.get<CartRes>(`${environment.url.base}/cart/all`, httpOptions).pipe(
      take(1),
      tap(cartRes => {
        console.log('cartRes', cartRes);
        const data: any = cartRes.data;
        if(!cartRes.success && data === 401) {
          this.accountService.logOut();
        }
        // this._cartObj.next(cartRes.data.product);
        this._cartDetails.next(cartRes);
        this._cartTotalItems.next(cartRes.data.totalItem ? cartRes.data.totalItem : 0);
      })
    );
  }

  deleteCartItem(id) {
   console.log('deleted cart id : ', id);
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
      let details;
        this.cartDetails.pipe(take(1)).subscribe(detail => {
          details = detail;
          console.log('cart prev detail : ', detail);
          details.data.product.map(res=>{
            console.log('cart id products details : ', res);
            if(res.id === id) {
              // detail.data.subtotal
              console.log('res id : ', res.id);
              details.data.subtotal = details.data.subtotal ? details.data.subtotal-res.discountedPrice : 0;
              details.data.grandTotal = details.data.grandTotal ? details.data.grandTotal-res.discountedPrice : 0;
              console.log('grand total change : ', details);
              const nextTotalItems = details.data.totalItem ? details.data.totalItem-res.quantity : 0;
              details.data.totalItem = nextTotalItems;
              this._cartTotalItems.next(nextTotalItems);
            }
          });
          const nextDetails = details.data.product.filter(res => res.id !== id);
          details.data.product = nextDetails;
          console.log('deleted cart : ', details);

          console.log('filtered cart product : ', nextDetails);
          console.log('next deleted details : ', details);
          this._cartDetails.next(details);
        });
        return this.http.post<CartAddRes>(`${environment.url.base}/cart/delete/${id}`, null, httpOptions).pipe(
          take(1),
          tap(newCartItemRes => {
              this.fetchCartObj().subscribe();

          }),
        );
  }

  addTOCart(productId, skuId, quantity=1, backgroundImage=null, phoneDesignId=2, type=null, modelName=null, mainImage=null){
    const token = this.accountService.userToken;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
    const body = {productId, skuId, quantity, phoneDesignId, type, modelName, mainImage, backgroundImage};
    console.log(body);
    if(phoneDesignId === null || phoneDesignId === undefined) {
      body.phoneDesignId = 2;
    }
    return this.http.post<any>(
      //`http://demo.rongobuy.com/api/v1/add-to-cart`,
      `${environment.url.base}/cart/add`,
      body,
      httpOptions).pipe(
      take(1),
      tap(newCartItemRes => {
        let details;
        this.cartDetails.pipe(take(1)).subscribe(detail => {
          details = detail;
          console.log('cart added : ', detail);

          details.data.product.concat(newCartItemRes.data);

          const nextTotalItems = details.data.totalItem ? details.data.totalItem+quantity : 0;
          details.data.totalItem = nextTotalItems;

          this._cartDetails.next(details);
          this._cartTotalItems.next(nextTotalItems);
          this.fetchCartObj().subscribe();
        });
      }),
    );
  }

}
