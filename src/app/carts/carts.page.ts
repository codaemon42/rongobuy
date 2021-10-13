import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit {
  layout = 'horizontal';

  constructor(private breakpoint: BreakpointObserverService, private nav: NavController) { }

  ngOnInit() {
    this.getLayout();
  }

  getLayout(){
    this.breakpoint.size.subscribe((data)=>{
      console.log(data);
      if(data === 'sm' || data === 'md' || data === 'lg' || data === 'xl'){
        this.layout = 'vertical';
      }
      else {
        this.layout = 'horizontal';
      }
    });
  }

  onCart() {
    this.nav.navigateForward('checkout');
    console.log('next');
  }
}
