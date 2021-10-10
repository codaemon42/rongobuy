import { MenuController, NavController } from '@ionic/angular';
/* eslint-disable max-len */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() searchText = 'search in Products...';
  @Output() searchTextFound = new EventEmitter<string>();
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';

  constructor(private menu: MenuController, private nav: NavController ) { }

  ngOnInit() {}

  openMenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log('menu clicked');
  }

  onSearch(event){
    this.searchTextFound.emit(event.target.value);
  }

  onCartClicked(){
    console.log('cart clicked');
    this.nav.navigateForward('/carts');
  }
}
