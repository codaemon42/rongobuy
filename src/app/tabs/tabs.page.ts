import { ProductsService } from 'src/app/services/products.service';
import { HomepageService } from './../services/homepage/homepage.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserverService } from '../services/breakpoint.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  showTabTitle = true;
  desktop = false;
  searchShow = false;
  isLoading = false;
  searchResultData: Product[] = [];
    searchResult = {
    height: 400,
    display: 'block',
    overflow: 'scroll'
  };
  constructor(
    private brkPointObs: BreakpointObserverService,
    private productsService: ProductsService
  ) { }
  ngOnInit() {
    this.getSize();
  }

  getSize() {
    this.brkPointObs.size.subscribe(data=>{
      console.log('size : ', data);
      if( data === 'xl' || data === 'lg' ) {
        this.desktop = true;
      } else {
        this.desktop  = false;
      }
    });
  }

  onSearch(event) {
    console.log('search product : ', event.detail.value);
    if ( event.detail.value === '' || event.detail.value.length < 2) {
      this.searchShow = false;
      this.isLoading = false;
    }
    else {
        this.isLoading = true;
        console.log('products');
        this.productsService.fetchProductsBySearch(event.detail.value).subscribe(res=>{
          console.log('data from search : ', res.data.data);
          this.searchShow = true;
          this.isLoading = false;
          this.searchResultData = res.data.data;
        });
    }
  }

  onKeyInput(event){
      this.isLoading = true;
      this.searchShow = false;
  }

}
