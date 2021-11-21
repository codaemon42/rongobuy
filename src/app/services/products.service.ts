import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

export interface ProductListResponse {
  success: boolean;
  data: {
    count: number;
    perPage: number;
    prevPage: number;
    nextPage: string;
    totalPage: number;
    data: Product[];
    };
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private _product = new BehaviorSubject<Product[]>(null);
  private _selectedProductBackground = new BehaviorSubject<string>(null);

  constructor( private http: HttpClient) { }


  get products() {
    return this._product.asObservable();
  }

  get selectedProductBackground() {
    return this._selectedProductBackground.asObservable();
  }

  addSelectedProductBackground(image) {
    this._selectedProductBackground.next(image);
  }

  fetchProductsByCat(slug) {
    return this.http.get<ProductListResponse>(`http://public.rongobuy.com/api/v1/category/${slug}`).pipe(
      take(1),
      tap( productList =>{
        console.log('productListRes : ', productList.data);
        console.log('productList : ', productList.data.data);
        this._product.next(productList.data.data);
      })
    );
  }

  fetchProductsBySearch(text) {
      return this.http.post<ProductListResponse>(`http://public.rongobuy.com/api/v1/search`, {search: text}).pipe(
        take(1),
        tap( productList =>{
          console.log('productListRes : ', productList.data);
          console.log('productList : ', productList.data.data);
          this._product.next(productList.data.data);
        })
      );
    }



}
