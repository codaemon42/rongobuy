/* eslint-disable max-len */
import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private statusBar: StatusBar
    ) {
      this.initializeApp();
     }

  initializeApp() {
      this.platform.ready().then(() => {
        // let status bar overlay webview
        this.statusBar.overlaysWebView(true);

        // set status bar to white
        this.statusBar.backgroundColorByHexString('#000');

      });
  }


  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('menu clicked');
  }

  closeMenu() {
    this.menu.close('custom');
  }
}
