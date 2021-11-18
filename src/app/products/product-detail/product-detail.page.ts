import { SkuPriceList } from './../../models/sku.model';
import { AccountService } from './../../account/account.service';
import { Subscription } from 'rxjs';
import { Cart } from './../../models/cart.model';
import { Product } from '../../models/product.model';

// import { StorageService } from './../../services/storage.service';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
//import { CartService } from './../../services/cart.service';

//import { CartsService } from './../../carts/carts.service';
import { Review } from './../../components/reviews/reviews.model';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonContent, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  product_slug: string;
  animator: any;
  animatorDuration = 800;
  totalCartQty: number;
  cartItem: Cart;
  products: Product[];
  singleProduct: Product;
  rating = 4;
  segment = 'description';
  reviews: Review[];

  slug = 'red-light-green-light-premium-covers-available-for-all-the-phone-models-7593';
  tryProduct: Product;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };

  selectedAttr: any[] = [];

  selectedSKUProduct: SkuPriceList;

  cartQtySub: Subscription;

  constructor(
    private animationCtrl: AnimationController,
    private nav: NavController,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private accountService: AccountService
    ) { }


  ngOnInit() {
    this.totalCartQty = 0;
    this.cartQuantityController();
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

  // ionViewWillEnter(){
  //   this.cartQuantityController();
  // }

  ngAfterViewInit(){
    // scroll to top
      this.scrollToTop(900);
      console.log('after view init');
  }


  getSingleProduct(product_slug) {
    this.productService.fetchSingleProduct(product_slug).subscribe( product => {
      console.log('product detail : ', product);
      this.singleProduct = product;
      this.selectedSKUProduct = this.singleProduct.skuModule.skuPriceList[0];
      const propValues = this.singleProduct.skuModule.skuPriceList[0].skuPropValIds;
      this.singleProduct.skuModule.productSKUPropertyList.map(res=>{
        res.skuPropertyValues.map(pVal=>{
          pVal['active'] = false;
          if( this.inCommaArray(pVal.propertyValueId, propValues) ) {
            pVal['active'] = true;
          }
        });
      });
    });
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

    if( this.accountService.isLoggedIn() ) {
      this.cartAdder();
    } else {
      this.nav.navigateForward('tabs/carts');
    }

    console.log('carted');
  }

  buyNow() {
    this.addToCart();
    this.nav.navigateForward('carts');
  }

  genarateSKU(skuModule) {
    const productSKUPropertyList = skuModule.productSKUPropertyList; // Attributes
    const skuPriceList = skuModule.skuPriceList; // products

    const newAttributeProductArray = [];

  }

  getAttr(attrIndex, attrValIndex, propertyValueId) {
    this.selectedAttr = [];
    const selectedPropertyValIds = [];
    this.singleProduct.skuModule.productSKUPropertyList.map((property, index)=>{
      if(attrIndex === index){
        property.skuPropertyValues.map((value, valIndex)=>{
          value['active']=false;
          if(valIndex === attrValIndex && value.propertyValueId === propertyValueId) {
            value['active']=true;
            selectedPropertyValIds.push(value.propertyValueId);
          }
        });
      } else {
        property.skuPropertyValues.map((value, valIndex)=>{
          if(value['active']) {
            selectedPropertyValIds.push(value.propertyValueId);
          }
        });
      }
    });
    console.log('selectedPropertyValIds : ', selectedPropertyValIds.toString());
  this.getSelectedProduct(selectedPropertyValIds.toString());
    console.log('selected attr  :', this.singleProduct.skuModule.productSKUPropertyList);
  }

  getSelectedProduct(propValIds) {
    this.singleProduct.skuModule.skuPriceList.map((item, index )=> {
      if(item.skuPropValIds === propValIds) {
        this.selectedSKUProduct = item;
      }
    });
  }

  ngOnDestroy() {
    this.cartQtySub.unsubscribe();
  }






  // helper

  inCommaArray( value, stringComma ) {
    if ( stringComma.split(',').indexOf(value) === -1 ) {
      return false;
    } else {
      return true;
    }
  }

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
   * increase cart item by 1 on click add to cart button
   * calls cartsService f(addCartItem)
   * update cartService carted amount
   */
  cartAdder() {
    this.totalCartQty += 1;
    console.log('product-detail cartAdder');
    const skuId = `${this.singleProduct.id}-green`;
    this.cartService.addTOCart(this.singleProduct.id, this.selectedSKUProduct.SkuId).subscribe();
  }


  /**
   * controls the cart quantity of single product
   */
  cartQuantityController() {
    this.cartQtySub = this.cartService.cartTotalItems.subscribe(res => {
      this.totalCartQty = res;
    });
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


}
