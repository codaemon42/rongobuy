import { BreakpointObserverService } from './../services/breakpoint.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.page.html',
  styleUrls: ['./carts.page.scss'],
})
export class CartsPage implements OnInit {
  layout = 'horizontal';

  constructor(private breakpoint: BreakpointObserverService) { }

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
}
