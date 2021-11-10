import { Device } from '@ionic-native/device/ngx';
/* eslint-disable max-len */
import { Component } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menus: any;
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  name: any;
  osVersion: string = "";
  uuid: string = "";
  constructor(
    private menuCtrl: MenuController,
    private menuService: MenuService,
    private platform: Platform,
    private statusBar: StatusBar,
    private nav: NavController,
    private device: Device
    ) {
      this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
        // let status bar overlay webview
        this.statusBar.overlaysWebView(true);

        // set status bar to white
        this.statusBar.backgroundColorByHexString('#000');

        this.osVersion = this.device.version;
        this.uuid = this.device.uuid;
        this.name = this.device.isVirtual;
        console.log(this.osVersion, this.uuid, this.name);

      });

      this.getMenus();
      // setTimeout(()=>{
      //   this.menus[1].show = true;
      // }, 7000);
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
}
