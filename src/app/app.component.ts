/* eslint-disable max-len */
// import { Component, NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { AccountService } from './account/account.service';
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
  //logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  // isLoggedIn = false;
  name: any;
  menus: any;
  osVersion = '';
  uuid = '';
  constructor(
    private menuCtrl: MenuController,
    private menuService: MenuService,
    private platform: Platform,
    private accountService: AccountService,
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
      //this.accountService.isLoggedIn();

      // if(this.accountService.isLoggedIn()){
      //   this.isLoggedIn = true;
      // } else {
      //   this.isLoggedIn = false;
      // }
      // this.isLoggedIn = this.accountService.isLoggedIn();
      this.platform.ready().then(() => {
        // let status bar overlay webview
        //this.statusBar.overlaysWebView(true);

        // set status bar to white
        //this.statusBar.backgroundColorByHexString('#000');

        // this.osVersion = this.device.version;
        // this.uuid = this.device.uuid;
        // this.name = this.device.isVirtual;
        // console.log(this.osVersion, this.uuid, this.name);
      });

      //this.setDeeplinks();

      this.getMenus();
      // setTimeout(()=>{
      //   this.menus[1].show = true;
      // }, 7000);
  }

  getMenus(){
    this.menus = this.menuService.fetchMenus();
  }

  setDeeplinks() {
    //     this.deeplinks.route({
    //        '/:slug': 'products'
    //        }).subscribe(
    //     match => {
    //     console.log('Successfully matched route', match);

    //     // Create our internal Router path by hand
    //     const internalPath = `/${match.$route}/${match.$args['slug']}`;

    //     // Run the navigation in the Angular zone
    //     this.zone.run(() => {
    //       this.router.navigateByUrl(internalPath);
    //     });
    //   },
    //   nomatch => {
    //     // nomatch.$link - the full link data
    //     console.error("Got a deeplink that didn't match", nomatch);
    //   }
    // );
      // this.deeplinks.routeWithNavController(this.nav, {
      //   '/pages/order-tracking': PagesPage,
      //   '/pages/:slug': PagesPage,
      //   '/phone-customizer': PhoneCustomizerPage,
      //   '/products/:productId': ProductDetailPage
      // }).subscribe((match) => {
      //   console.log('Successfully routed', match);
      // }, (nomatch) => {
      //   console.warn('Unmatched Route', nomatch);
      // });
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

  // async logOut(){
  //   const loading = await this.loadingService.loader('Logging out ...', 2000);
  //   if(loading) {
  //     this.accountService.logOut();
  //     this.closeMenu();
  //     this.nav.navigateForward('tabs/home');
  //   }
  // }
}
