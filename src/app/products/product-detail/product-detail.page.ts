import { Review } from './../../components/reviews/reviews.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../products.model';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  products: Product[];
  singleProduct: Product;
  rating = 4;
  segment = 'reviews';
  reviews: Review[];

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    console.log(' on init');
    this.products = this.productService.products;
    this.singleProduct = this.products[0];


        this.reviews = [
      {
        id: '1',
        user_name: 'Ovi',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '2',
        user_name: 'Supriya',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '3',
        user_name: 'naim',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '4',
        user_name: 'oishe',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
      {
        id: '5',
        user_name: 'rasel',
        product_slug: 'product-one',
        rating: 5,
        review: 'this is the description of the review given'
      },
    ];
  }

  ngAfterViewInit(){
    //this.content.scrollToPoint(0, 0, 0);
    setTimeout(()=>{
      this.content.scrollToTop(900);
      console.log('timout');
    },500);
    console.log('after view init');
  }

  segmentChanged(event) {
    console.log(event.target.value);
    if (event.target.value) {
      this.segment = event.target.value;
      this.content.scrollToPoint(200, 300, 1500);
    }
  }


}
