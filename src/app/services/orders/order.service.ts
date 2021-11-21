import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderAddRes, OrderSingleRes, OrdersRes } from '../../models/orders.model';
import { AccountService } from 'src/app/account/account.service';
import { take, tap } from 'rxjs/operators';

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
    return this.http.get<OrdersRes>(`${environment.url.base}/order/all?status=pending`, headerOps).pipe(
      take(1),
      tap(orderRes => {
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

  addOrder(shippingAddressId, gift=0, message='', from='') {
    const headerOps = this.headerOptions();
    const body = {
      shippingAddressId
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

  headerOptions() {
    const token = this.accountService.userToken;
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`})
    };
  }


}
