import { Subscription } from 'rxjs';
import { PhoneCover } from './../../../models/phone-cover.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phone-cover-detail',
  templateUrl: './phone-cover-detail.page.html',
  styleUrls: ['./phone-cover-detail.page.scss'],
})
export class PhoneCoverDetailPage implements OnInit, OnDestroy {

  phoneCovers: PhoneCover[] = [];
  isDisplay = false;
  phoneCoverCatChild: any;
  selectedCatChild: any = null;
  catSub: Subscription;
  backgroundImage = null;
  slug = '';
  skeleton = [1,2,3,4,5,6,7,8,9,10];

  constructor(
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService,
    private router: ActivatedRoute,
    private nav: NavController,
  ) { }

  ngOnInit() {
    //this.closeLoader();
    this.categoryService.fetchCategories().subscribe(res=>this.isDisplay = true);
    this.router.params.subscribe(res=>{
      console.log(res.slug);
      this.slug = res.slug;
      this.catSub = this.categoryService.categories.subscribe(categories=>{
        this.getCategory(categories, res.slug).then(phoneCat=>{
          this.phoneCoverCatChild = phoneCat;
          console.log('this.phoneCoverCatChild : ', this.phoneCoverCatChild);
        });
      });
    });
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
    //this.onRoute(slug);

  }
  onChangeArea() {
    console.log('changed', this.selectedCatChild);
    this.loadingCtrl.create({message: 'Loading Designs'}).then(el=>el.present());
    setTimeout(()=>{
      this.loadingCtrl.dismiss();
      this.onRoute(this.selectedCatChild.slug);
    },1000);
  }

  onRoute(slug) {
    this.nav.navigateForward(`category/phone-cover/phone-cover-detail/${this.slug}/${slug}`);
  }

  ngOnDestroy() {
    this.catSub.unsubscribe();
  }

}
