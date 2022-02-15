import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-phone-cover',
  templateUrl: './phone-cover.page.html',
  styleUrls: ['./phone-cover.page.scss'],
})
export class PhoneCoverPage implements OnInit, OnDestroy {

  hideOverlay = false;
  phoneCoverCat: Category = null;
  phoneCoverChild: Category[] = [];
  indvPhones: Category[] = [];
  selectedBrand: Category = null;
  catSub: Subscription;
  skeletonCount = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,6,7];
     area = [
     {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'},
     {name: 'Realme', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'vivo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'},
     {name: 'oppo', img: '../../assets/phone-cover/vivo/V5.png', cost: '60'}
    ];
  selectedArea = {name: 'Samsung', img: '../../assets/phone-cover/samsung/A5-2017.png', cost: '60'};
  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe();
    this.catSub = this.categoryService.categories.subscribe(categories=>{
      this.phoneCoverCat = categories.find(cat=>cat.slug === 'phone-cover');
      console.log('this.phoneCoverCat : ', this.phoneCoverCat);
      if(this.phoneCoverCat!==undefined){
        // this.getSpecificCat(categories).then(category=>{})
        //this.selectedBrand = this.phoneCoverCat['child'][0];
        //console.log('selectedBrand : ', this.selectedBrand);
        this.phoneCoverChild = this.phoneCoverCat['child'];
        console.log('phoneCoverChild : ', this.phoneCoverChild);
        this.indvPhones = this.getAllPhoneCats(this.phoneCoverCat['child']);
        console.log('all cats phone :', this.indvPhones);

      }
    });
  }

  getAllPhoneCats(categories){
    const category = [];
    categories.map(parentCats=>{
      category.push(...parentCats['child']);
    });
    return category;
  }

  getSpecificCat(categories){
    return new Promise(resolve=>{
      const cats = categories.find(cat=>cat.slug === 'phone-cover');
      resolve(cats);
    });
  }

  onChangeArea() {
    console.log('changed', this.selectedBrand);
    if(!this.selectedBrand){
      return;
    }
    this.loadingCtrl.create({message: 'Loading Model'}).then(el=>el.present());
    setTimeout(()=>{
      this.loadingCtrl.dismiss();
      //this.onRoute(this.selectedBrand.slug);
      //category/phone-cover/phone-cover-detail/vivo/vivo-y12a-8925
      this.nav.navigateForward(`category/phone-cover/phone-cover-detail/any/${this.selectedBrand.slug}`);
    },1000);
  }

  onRoute(slug) {
    this.nav.navigateForward(`category/phone-cover/phone-cover-detail/${slug}`);
  }

  onSelectModel(event) {
    console.log('model event : ', event);
    if ( event !== null ) {
      let counter = 1;
      this.loadingCtrl.create({
        message: `Loading ${event.name} models`,
        mode: 'ios',
        duration: 2000
      }).then(loadingEl => {
        loadingEl.present();
        const timer = setInterval(()=>{
          if( this.hideOverlay ) {
            console.log(counter++);
            this.hideOverlay = false;
            this.nav.navigateForward('category/phone-cover/phone-cover-detail');
            clearInterval(timer);
          }
        },100);
      });
    }
  }

  onHiddenOverlay(event) {
    this.hideOverlay = event;
    console.log('event', this.hideOverlay);
  }

  ngOnDestroy() {
    this.catSub.unsubscribe();
  }

}
