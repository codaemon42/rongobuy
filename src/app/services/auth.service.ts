import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _referrer = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  get referrer() {
    return this._referrer.asObservable();
  }

  addReferrer(referrer='/tabs/home') {
    this._referrer.next(referrer);
  }

  loginWithOtp(phone='01767000000') {
    return new Promise(resolve=>{
      const url = `${environment.url.auth}/send-otp`;
      const body = {
        mobile: phone
      };
      this.http.post<any>(url, body).subscribe( resData => {
        console.log('sms api call login : ', resData);
        resolve(resData);
      });
    });
  }

  checkOTP(phone='01767000000', code='111111') {
    return new Promise(resolve=>{
      const url = `${environment.url.auth}/check-otp`;
      const body = {
        mobile: phone,
        otp: code
      };
      this.http.post<any>(url, body).subscribe(resData => {
        console.log('otp verified : ', resData);
        resolve(resData);
      });
    });
  }

  getToken() {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hdXRoLnJvbmdvYnV5LmNvbVwvYXBpXC9hdXRoXC92MVwvY2hlY2stb3RwIiwiaWF0IjoxNjM2Mjc5ODQ4LCJleHAiOjE2MzYyODM0NDgsIm5iZiI6MTYzNjI3OTg0OCwianRpIjoiY0FBMEEwZW1lSndZRGg1NiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.UuFEB4ZZMSKHdpCqJkbzmpcS7Qm7mOuqJJz62YAKfkM';
  }

    mockAddCart(token) {
    const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`
    });
    const url = 'http://public.rongobuy.com/api/v1/cart/add';
    const body = {
      productId: '12',
      skuId: '12-green',
      quantity: '2'
    };
    this.http.post(url, body, {headers}).subscribe(resData=>{
      console.log('auth cart added : ', resData);
    });
  }
}
