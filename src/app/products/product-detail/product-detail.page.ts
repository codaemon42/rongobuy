import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { AuthService } from './../../services/auth.service';
import { WishlistService } from './../../services/wishlist/wishlist.service';
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
import { ToastService } from 'src/app/services/controllers/toast.service';
import { ProductsService } from 'src/app/services/products.service';
import { Wishlist } from 'src/app/models/wishlist.model';
import { PhoneModelService } from 'src/app/services/phone-model/phone-model.service';



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
    speed: 300,
    autoplay: true
  };

  selectedAttr: any[] = [];

  selectedSKUProduct: SkuPriceList;

  cartQtySub: Subscription;
  phoneCoverServiceSub: Subscription;
  selectedProductsServiceSub: Subscription;

  disableCartButtons = false;

  backGroundImage = null;

  wishlistColor = false;

  selectedPhoneCover = null;

  constructor(
    private animationCtrl: AnimationController,
    private nav: NavController,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private productsService: ProductsService,
    private accountService: AccountService,
    private toastService: ToastService,
    private authService: AuthService,
    private phoneCoverService: PhoneCoverService,
    private phoneModelService: PhoneModelService
    ) { }


  ngOnInit() {
    this.totalCartQty = 0;
    this.cartQuantityController();
    this.activatedRoute.params.subscribe(data => {
      console.log('activated route : ', data.slug);
      this.product_slug = data.slug;
      this.getSingleProduct(data.slug);
    });
    this.phoneCoverServiceSub = this.phoneCoverService.selectedPhoneCover.subscribe(res=>{
      this.selectedPhoneCover = res;
      console.log('this.selectedPhoneCover : ', this.selectedPhoneCover);
    });
    this.phoneCoverService.fetchPhoneCoversByFilter().subscribe(data=>{
      console.log('fetch fn covers detail page: ', data);
    });

    this.selectedProductsServiceSub = this.productsService.selectedProductBackground.subscribe(res=>{
      this.backGroundImage = res;
      console.log('this.backGroundImage : ', this.backGroundImage);
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

      //document.getElementById('short').innerHTML = this.singleProduct.shortDescription;
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
      if(this.product_slug){
        this.authService.addReferrer(`products/${this.product_slug}`);
        this.nav.navigateForward('tabs/account');
      } else {
        this.nav.navigateForward('tabs/account');
      }
    }

    console.log('carted');
  }

  buyNow() {
    this.addToCart();
    this.nav.navigateForward('tabs/carts');
  }

  addToWishlist() {
    if(this.accountService.isLoggedIn()) {
      this.wishlistColor = !this.wishlistColor;
      const designId = this.selectedPhoneCover ? this.selectedPhoneCover.id : null;
      this.wishlistService.addToWishlist(this.singleProduct.id, this.selectedSKUProduct.SkuId, this.backGroundImage, designId).subscribe(res=>{
        if(res.success){
          this.toastService.toast('added to wishlist', 'success', 2000);
        } else {
          this.wishlistColor = !this.wishlistColor;
          this.toastService.toast(res.message, 'danger', 2000);
        }
      });
    }
    else {
      if(this.product_slug){
        this.authService.addReferrer(`products/${this.product_slug}`);
        this.nav.navigateForward('tabs/account');
      } else {
        this.nav.navigateForward('tabs/account');
      }
    }
  }

  genarateSKU(skuModule) {
    const productSKUPropertyList = skuModule.productSKUPropertyList; // Attributes
    const skuPriceList = skuModule.skuPriceList; // products

    const newAttributeProductArray = [];

  }

  getAttr(attrIndex, attrValIndex, propertyValueId) {
    this.selectedAttr = [];
    this.checkAvailability(attrIndex, attrValIndex, propertyValueId).then(resp=>{
      const promised: any = resp;
      if(promised.success){
        this.disableCartButtons = false;
        this.singleProduct.skuModule.productSKUPropertyList.map((property, index)=>{
          if(attrIndex === index){
            property.skuPropertyValues.map((value, valIndex)=>{
              value['active']=false;
              if(valIndex === attrValIndex && value.propertyValueId === propertyValueId) {
                value['active']=true;
              }
            });
          }
        });
            console.log('selectedPropertyValIds : ', promised.selectedPropertyValIds);
            this.getSelectedProduct(promised.selectedPropertyValIds);
            console.log('selected attr  :', this.singleProduct.skuModule.productSKUPropertyList);

      } else {
        // toast
        this.disableCartButtons = true;
        this.toastService.toast('sorry this variation not available...', 'danger', 2000);
      }
    });

  }

  checkAvailability(attrIndex, attrValIndex, propertyValueId) {
    return new Promise( resolve=>{
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

      const propValIds = selectedPropertyValIds.toString();

      const data = this.singleProduct.skuModule.skuPriceList.filter(skuProduct=> skuProduct.skuPropValIds === propValIds);
      if(data.length > 0) {
        resolve({
          success: true,
          selectedPropertyValIds: propValIds
        });
      } else {
        resolve({
          success: false,
          selectedPropertyValIds: propValIds
        });
      }
    });

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
    this.phoneCoverServiceSub.unsubscribe();
    this.selectedProductsServiceSub.unsubscribe();
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
    const designId = this.selectedPhoneCover ? this.selectedPhoneCover.id : null;
    this.cartService.addTOCart(this.singleProduct.id, this.selectedSKUProduct.SkuId, 1, this.backGroundImage, designId).subscribe();
    console.log(this.singleProduct.id, this.selectedSKUProduct.SkuId, this.backGroundImage);
  }


  /**
   * controls the cart quantity of single product
   */
  cartQuantityController() {
    this.cartQtySub = this.cartService.cartTotalItems.subscribe(res => {
      this.totalCartQty = res;
    });
  }

  onCustomize(productName) {
    this.phoneModelService.addSelectedModel(productName);
    this.nav.navigateForward('phone-customizer');
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
