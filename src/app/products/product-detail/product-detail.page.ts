import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../products.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  products: Product[];
  singleProduct: Product;

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products = this.productService.products;
    this.singleProduct = this.products[0];
  }

}
