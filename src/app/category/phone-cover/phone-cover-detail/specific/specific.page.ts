import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PhoneCover } from 'src/app/models/phone-cover.model';
import { Product } from 'src/app/models/product.model';
import { ToastService } from 'src/app/services/controllers/toast.service';
import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.page.html',
  styleUrls: ['./specific.page.scss'],
})
export class SpecificPage implements OnInit, OnDestroy {
  phoneCovers: PhoneCover[] = [];
  isDisplay = false;
  phoneCoverCatChild: any = [];
  phoneCoverSub: Subscription;
  backgroundImage = null;
  product: Product;

  phoneCoverPage = 0;
  gender = 'male';
  phoneModel = null;



  constructor(
    private router: ActivatedRoute,
    private productsService: ProductsService,
    private nav: NavController,
    private phoneCoverService: PhoneCoverService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(routes=>{
      this.productsService.fetchProductsByCat(routes.catSlug).subscribe(products=>{
        this.product = products.data.data[0];
        this.backgroundImage = products.data.data[0].backgroundImage;
        console.log('specific page product : ', this.product);
      });
    });
    this.fetchPhoneCovers();
  }

  segmentChanged(event) {
    this.phoneCoverPage = 0;
    this.gender = event.detail.value;
    if(this.gender === 'all') {
      this.gender = null;
    }
    this.fetchPhoneCovers();
    console.log('segments : ', this.gender);
  }

  fetchPhoneCovers() {
    this.phoneCoverPage++;
    this.phoneCoverSub = this.phoneCoverService.phoneCovers.subscribe(data => {
      this.phoneCovers = data;
      console.log('this fn cover : ', this.phoneCovers);
    });
    this.phoneCoverService.fetchPhoneCoversByFilter(this.phoneCoverPage, this.gender, this.phoneModel, this.phoneCovers).subscribe(data=>{
      console.log('fetch fn covers : ', data);
      this.isDisplay = true;
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
    this.phoneCoverSub.unsubscribe();
  }

}
