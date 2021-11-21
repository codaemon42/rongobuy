import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-phone-cover',
  templateUrl: './phone-cover.page.html',
  styleUrls: ['./phone-cover.page.scss'],
})
export class PhoneCoverPage implements OnInit {

  hideOverlay = false;
  phoneCoverCat: Category = null;
  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe();
    this.categoryService.categories.subscribe(categories=>{
      this.phoneCoverCat = categories.find(cat=>cat.slug === 'phone-cover');
      console.log('this.phoneCoverCat : ', this.phoneCoverCat);
    });
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

}
