import { NavController } from '@ionic/angular';
import { PhoneCover } from 'src/app/models/phone-cover.model';
import { PhoneCoverService } from 'src/app/services/phone-cover/phone-cover.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss'],
})
export class DisplayProductsComponent implements OnInit {
    products: Product[];
    phoneCovers: PhoneCover[];

    sortOptions: any[];

    sortOrder: number;

    sortField: string;

    sortKey: string;
    isLoading = true;
  constructor(
    private productService: ProductsService,
    private phoneCoverService: PhoneCoverService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.productService.fetchProductsBySearch(' ').subscribe(products => {
      this.products = products.data.data;
      this.isLoading = false;
      const interval = setInterval(()=>{
        if(this.phoneCovers.length <= 0) {
          //
        }
        else {
            this.products.map(p=>{
              p.design = this.phoneCovers[this.generateRandom(0,20)];
            });
            clearInterval(interval);
        }
      }, 500);
    });

    this.phoneCoverService.fetchPhoneCoversByFilter(1, 'male', null, []).subscribe(data=>{
      console.log('fetch fn covers : ', data);
      this.phoneCovers = data.data.data;
    });

    this.sortOptions = [
        {label: 'Price High to Low', value: '!productPrice'},
        {label: 'Price Low to High', value: 'productPrice'}
    ];
  }

  selectPhoneCover(selectedPhoneCover: PhoneCover, slug){
    console.log('design', {selectedPhoneCover, slug});
    this.phoneCoverService.addSelectedPhoneCover(selectedPhoneCover);
    this.productService.addSelectedProductBackground(selectedPhoneCover.image);
    this.nav.navigateForward(`/products/${slug}`);
  }

  search(dv, value) {
    console.log('value', value);
    dv.filter(value);
  }

  onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
  }

  generateRandom(min = 0, max = 20) {

    // find diff
    const difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

}
