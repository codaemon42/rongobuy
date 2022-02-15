/* eslint-disable max-len */
// import { Component, NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AccountService } from './account/account.service';
import { HomepageService } from './services/homepage/homepage.service';
import { MenuService } from './services/menu.service';

// import { LoadingService } from './services/controllers/loading.service';
// import { Router } from '@angular/router';

// import { ProductDetailPage } from './products/product-detail/product-detail.page';
// import { PhoneCustomizerPage } from './phone-customizer/phone-customizer.page';
// import { PagesPage } from './pages/pages.page';

// mobile usage
// import { Device } from '@ionic-native/device/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Deeplinks } from '@ionic-native/deeplinks/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  name: any;
  menus: any;

  constructor(
    private menuCtrl: MenuController,
    private menuService: MenuService,
    //private platform: Platform,
    private accountService: AccountService,
    private homeService: HomepageService,
    // private statusBar: StatusBar,
    private nav: NavController,
    // private device: Device,
    // private loadingService: LoadingService,
    // private deeplinks: Deeplinks,
    // private zone: NgZone,
    // private router: Router,
    ) {
      this.initializeApp();
  }

  initializeApp() {
    this.homeService.initHome();
    this.accountService.isLoggedIn();

    // this.platformInit();

    //this.setDeeplinks();

    this.getMenus();
  }

  getMenus(){
    this.menus = this.menuService.fetchMenus();
  }

  openMenu() {
    this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
    console.log('menu clicked');
  }

  closeMenu() {
    this.menuCtrl.close('custom');
  }

  onClickMenu(index) {
    console.log('index : ', index);
    if( this.menus[index].children.length > 0 ) {
      console.log('entered');
      this.menus[index].show = !this.menus[index].show;

    }
    else{
      this.closeMenu();
      this.nav.navigateForward(this.menus[index].route);
    }
  }

  onClickMenuSub(i, si) {
    this.nav.navigateForward(this.menus[i].children[si].route);
  }

  menuIcon(index) {
    if (this.menus[index].children.length > 0 && !this.menus[index].show){ // down
      return 'caret-down';
    }
    if (this.menus[index].children.length > 0 && this.menus[index].show){ // up
      return 'caret-up';
    }
    if (this.menus[index].children.length === 0 && !this.menus[index].show){ // forward
      return 'caret-forward';
    }
  }

  // property
    // osVersion = '';
    // uuid = '';
  // async logOut(){
  //   const loading = await this.loadingService.loader('Logging out ...', 2000);
  //   if(loading) {
  //     this.accountService.logOut();
  //     this.closeMenu();
  //     this.nav.navigateForward('tabs/home');
  //   }
  // }

  //   setDeeplinks() {
  //   //     this.deeplinks.route({
  //   //        '/:slug': 'products'
  //   //        }).subscribe(
  //   //     match => {
  //   //     console.log('Successfully matched route', match);

  //   //     // Create our internal Router path by hand
  //   //     const internalPath = `/${match.$route}/${match.$args['slug']}`;

  //   //     // Run the navigation in the Angular zone
  //   //     this.zone.run(() => {
  //   //       this.router.navigateByUrl(internalPath);
  //   //     });
  //   //   },
  //   //   nomatch => {
  //   //     // nomatch.$link - the full link data
  //   //     console.error("Got a deeplink that didn't match", nomatch);
  //   //   }
  //   // );
  //     // this.deeplinks.routeWithNavController(this.nav, {
  //     //   '/pages/order-tracking': PagesPage,
  //     //   '/pages/:slug': PagesPage,
  //     //   '/phone-customizer': PhoneCustomizerPage,
  //     //   '/products/:productId': ProductDetailPage
  //     // }).subscribe((match) => {
  //     //   console.log('Successfully routed', match);
  //     // }, (nomatch) => {
  //     //   console.warn('Unmatched Route', nomatch);
  //     // });
  // }
  // platformInit(){
  //         this.platform.ready().then(() => {
  //       // let status bar overlay webview
  //       //this.statusBar.overlaysWebView(true);

  //       // set status bar to white
  //       //this.statusBar.backgroundColorByHexString('#000');

  //       // this.osVersion = this.device.version;
  //       // this.uuid = this.device.uuid;
  //       // this.name = this.device.isVirtual;
  //       // console.log(this.osVersion, this.uuid, this.name);
  //     });
  // }
}
