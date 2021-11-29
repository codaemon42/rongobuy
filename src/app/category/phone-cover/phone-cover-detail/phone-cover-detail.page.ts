import { ProductService } from './../../../services/product.service';
import { Subscription } from 'rxjs';
import { PhoneCover } from './../../../models/phone-cover.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { ToastService } from 'src/app/services/controllers/toast.service';

@Component({
  selector: 'app-phone-cover-detail',
  templateUrl: './phone-cover-detail.page.html',
  styleUrls: ['./phone-cover-detail.page.scss'],
})
export class PhoneCoverDetailPage implements OnInit, OnDestroy {

  phoneCovers: PhoneCover[] = [];
  isDisplay = false;
  phoneCoverCatChild: any;
  catSub: Subscription;
  phoneCoverSub: Subscription;
  backgroundImage = null;
  product: Product;

  phoneCoverPage = 1;
  gender = null;
  phoneModel = null;

  constructor(
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService,
    private phoneCoverService: PhoneCoverService,
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private nav: NavController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    //this.closeLoader();
    this.categoryService.fetchCategories().subscribe();
    this.router.params.subscribe(res=>{
      console.log(res.slug);
      this.catSub = this.categoryService.categories.subscribe(categories=>{
        this.getCategory(categories, res.slug).then(phoneCat=>{
          this.phoneCoverCatChild = phoneCat;
          console.log('this.phoneCoverCatChild : ', this.phoneCoverCatChild);
        });
      });
    });
    this.fetchPhoneCovers();
  }

  getCategory(categories: any[], slug) {
    return new Promise(resolve=>{
      categories.map(cat=>{
        if(cat.slug === 'phone-cover') {
          cat.child.map(phoneCat => {
            if(phoneCat.slug === slug) {
              resolve(phoneCat.child);
            }
          });
        }
      });
    });
  }

  closeLoader() {
    this.loadingCtrl.dismiss();
  }

  onSelectImage(slug) {
    this.isDisplay = true;
    this.productsService.fetchProductsByCat(slug).subscribe(products=>{
      this.product = products.data.data[0];
      this.backgroundImage = products.data.data[0].mainImage;
    });
  }

  fetchPhoneCovers() {
    this.phoneCoverPage++;
    this.phoneCoverSub = this.phoneCoverService.phoneCovers.subscribe(data => {
      this.phoneCovers = data;
      console.log('this fn cover : ', this.phoneCovers);
    });
    this.phoneCoverService.fetchPhoneCoversByFilter(this.phoneCoverPage, this.gender, this.phoneModel, this.phoneCovers).subscribe(data=>{
      console.log('fetch fn covers : ', data);
    });
  }

  loadData(event) {
      this.phoneCoverPage++;
      console.log('infinite scroll data : ', event.target);
      this.phoneCoverService.fetchPhoneCoversByFilter(this.phoneCoverPage, this.gender, this.phoneModel, this.phoneCovers).subscribe(res=>{
        event.target.complete();
        if(res.data.data.length<=0){
          event.target.disabled = true;
          this.toastService.toast('No more Product available', 'danger', 2000);
        }
        if (this.phoneCovers.length === 10000) {
          event.target.disabled = true;
        }
        return true;
      });

  }

  onSelectProductModel(event) {
    console.log('selected backGround : ',this.phoneCovers[event]);
    this.productsService.addSelectedProductBackground(this.phoneCovers[event].image);
    this.nav.navigateForward(`products/${this.product.slug}`);
  }

  ngOnDestroy() {
    this.catSub.unsubscribe();
    this.phoneCoverSub.unsubscribe();
  }

}
