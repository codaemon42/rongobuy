// import { StorageService } from './../../services/storage.service';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//import { CartService } from './../../services/cart.service';

import { CartsService } from './../../carts/carts.service';
import { Review } from './../../components/reviews/reviews.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './../products.service';
import { Product } from './../products.model';
import { AnimationController, IonContent } from '@ionic/angular';
import { Carts } from 'src/app/carts/carts.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit, AfterViewInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  product_slug: string;
  animator: any;
  animatorDuration = 800;
  totalCartQty = 0;
  cartItem: Carts;
  products: Product[];
  singleProduct: Product;
  rating = 4;
  segment = 'description';
  reviews: Review[];

  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };
  constructor(
    private animationCtrl: AnimationController,
    private productService: ProductsService,
    private cartsService: CartsService,
    private activatedRoute: ActivatedRoute
    ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      console.log('activated route : ', data.slug);
      this.getSingleProduct(data.slug);
    });
    console.log(' on init');

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
    // scroll to top
      this.scrollToTop(900);
      console.log('after view init');
  }

  ionViewWillEnter(){
   this.cartQuantityController(this.singleProduct.id);
  }


  /**
   * fetch single product
   */
  getSingleProduct(product_slug) {
    this.products = this.productService.products.filter(product => product.slug === product_slug);
    console.log('product : ', this.products);
    this.singleProduct = this.products[0];

  }


  /**
   * observe segment change event and scroll to a point
   *
   * @param event
   * @return void
   */
  segmentChanged(event): void {
    console.log(event.target.value);
    if (event.target.value) {
      this.segment = event.target.value;
      this.content.scrollToPoint(200, 300, 1500);
    }
  }



  /**
   * controls all activity on cart product clicking add to cart button
   * start animation
   * play animation
   * increase cart quantity on completing the animation
   *
   * @since 1.0.0
   *
   * return void
   */
  addToCart(): void {
    this.animation();
    this.animator.play();

    setTimeout(()=>{
        this.cartAdder();
    }, this.animatorDuration);

    //this.cartService.addTOCart();

    console.log('carted');
  }




  // helper

  /**
   * scroll to a point
   *
   * @param position | number
   *
   * @return void
   */
  scrollToTop(position): void {
    setTimeout(()=>{
      this.content.scrollToTop(position);
      console.log('timeout');
    },500);
  }


  /**
   * define animation controls on click add to cart button
   */
  animation() {
    this.animator = this.animationCtrl.create()
    .addElement(document.querySelector('.square'))
    .duration(this.animatorDuration)
    .iterations(1)
    .fromTo('top', '80%', '2%')
    .fromTo('right', '10%', '12px')
    .fromTo('opacity', '0.2', '1');
  }


  /**
   * increase cart item by 1 on click add to cart button
   * calls cartsService f(addCartItem)
   * update cartService carted amount
   */
  cartAdder() {
    this.totalCartQty += 1;
    this.cartItem = {
      product_id: this.singleProduct.id,
      product_title: this.singleProduct.title,
      product_image: this.singleProduct.images[0],
      unit_price: parseInt(this.singleProduct.sale_price, 10),
      qty: this.totalCartQty
    };
    this.cartsService.addCartItem(this.cartItem);
  }


  /**
   * controls the cart quantity of single product
   */
  cartQuantityController(product_id) {
    this.totalCartQty = this.cartsService.getCartQuantityByProduct(product_id);
  }


}
