import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-phone-cover',
  templateUrl: './phone-cover.page.html',
  styleUrls: ['./phone-cover.page.scss'],
})
export class PhoneCoverPage implements OnInit {

  hideOverlay = false;
  constructor(
    private nav: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  onRoute() {
    this.nav.navigateForward('category/phone-cover/phone-cover-detail');
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
