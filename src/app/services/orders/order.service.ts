import { environment } from './../../../environments/environment';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderAddRes, OrderSingleRes, OrdersRes } from '../../models/orders.model';
import { AccountService } from 'src/app/account/account.service';
import { catchError, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orders = new BehaviorSubject<Order[]>([]);

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  get orders() {
    return this._orders.asObservable();
  }

  fetchOrders() {
    const headerOps = this.headerOptions();
    return this.http.get<OrdersRes>(`${environment.url.base}/order/all`, headerOps).pipe(
      take(1),
      tap(orderRes => {
        console.log('orders : ', orderRes);
        const data: any = orderRes.data;
        if(!orderRes.success && data === 401) {
          this.accountService.logOut();
        }
        const orders = orderRes.data.data;
        this._orders.next(orders);
      })
    );
  }

  fetchSingleOrder(id) {
    const headerOps = this.headerOptions();
    return this.http.post<OrderSingleRes>(`${environment.url.base}/order/single?orderId=${id}`, {}, headerOps).pipe(
      take(1),
      tap(singleOrderRes => {
        return singleOrderRes;
      })
    );
  }

  addOrder(shippingAddressId, couponCode=null, gift=0, message='', from='') {
    const headerOps = this.headerOptions();
    const body = {
      shippingAddressId,
      couponCode,
      gift,
      message,
      from
    };
    return this.http.post<OrderAddRes>(`${environment.url.base}/order/place`, body, headerOps).pipe(
      take(1),
      tap(newOrder=>{
        console.log('newOrder : ', newOrder);
        this.fetchOrders().subscribe(res=>{
          return res;
        });
      })
    );
  }

  addCustomOrder(shippingAddressId, mainImage='', backgroundImage='', logoImage='', text='',
  gift=0, message='', from='', couponCode=null, modelName='Customized') {
    const headerOps = this.headerOptions();
    const body = {
      shippingAddressId,
      mainImage,
      backgroundImage,
      logoImage,
      text,
      gift,
      message,
      from,
      couponCode,
      modelName
    };
    console.log('custom order body : ', body, text.length);
    return this.http.post<any>(`${environment.url.base}/order/custom`, body, headerOps).pipe(
      take(1),
      tap(order=>{
        console.log('custom order : ', order);
      }),
      catchError(err => of('error', err))
    );
  }

  trackOrder(orderId, mobile) {
    return this.http.post<any>(`${environment.url.base}/order/track`, {orderId, mobile}).pipe(
      take(1),
      tap(order=>{
        console.log('order track : ', order);
      })
    );
  }

  headerOptions() {
    const token = this.accountService.userToken;
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
  }


}
