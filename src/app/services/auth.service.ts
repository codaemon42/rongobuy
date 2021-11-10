import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  loginWithOtp(phone='01767000000') {
    const url = 'http://auth.rongobuy.com/api/auth/v1/send-otp';
    const body = {
      mobile: phone
    };
    this.http.post(url, body).subscribe( resData => {
      console.log('resData : ', resData);
      return resData;
    });

    setTimeout(()=>{
      this.checkOTP();
    },3000);
  }

  checkOTP(phone='01767000000', code='111111') {
    const url = 'http://auth.rongobuy.com/api/auth/v1/check-otp';
    const body = {
      mobile: '01767000000',
      otp: '111111'
    };
    this.http.post<any>(url, body).subscribe(resData => {
      console.log('otp verified : ', resData);

      this.mockAddCart(resData.data.access_token);
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
