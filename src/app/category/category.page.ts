import { CategoryService } from './../services/category.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit, OnDestroy {
  items: MenuItem[];
  menuBackLabel: string;
  catSearchPlaceholder: string;
  catSearchId: string;
  prevCat: string;
  postCat: string;
  searchData;
  categoryImages: any[];
  isPhoneCover = false;
  mockImage;

  //mock
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  pImage = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  //miniProducts: MiniProduct[];
  products: Product[];
  productSub: Subscription;
  isLoading = true;

  constructor(
    private nav: NavController,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryImages = this.categoryService.images;
    this.productSub = this.productsService.products.subscribe(res => {
      this.products = res;
    });
    this.productsService.fetchProductsByCat('Bags-and-Travel').subscribe(()=>{
      this.isLoading = false;
    });
    this.items = [
            {
              id: 'categories',
              label: 'Categories',
              escape: false
            },
            {
              id: 'men',
              label: 'Men',
              escape: false,
              items: [{
                      id: 't-shirt',
                      label: 'T-Shirt',
                      items: [
                          {
                            id: 'customized',
                            label: 'Customized',
                          },
                          {id: 'pre-made', label: 'Pre Made'}
                      ]
                  },
                  {id: 'shirt', label: 'Shirt'},
                  {separator: true},
                  {id: 'pant', label: 'Pant'}
              ]
            },
            {
              id: 'women',
              label: 'Women',
              escape: false,
              items: [{
                      id: 't-shirt',
                      label: 'T-Shirt',
                      items: [
                          {
                            id: 'customized',
                            label: 'Customized'
                          },
                          {id: 'pre-made', label: 'Pre Made'}
                      ]
                  },
                  {id: 'shirt', label: 'Shirt'},
                  {separator: true},
                  {id: 'pant', label: 'Pant'}
              ]
          },
            {
              id: 'accessories',
              label: 'Accessories',
              escape: false,
              items: [{
                      id: 'phone-cover',
                      label: 'Phone Cover',
                      command: (event) => {
                        this.menuHandler(event.item);
                      },
                      items: [
                          {
                            id: 'iphone',
                            label: 'iphone',
                            command: (event) => this.menuHandler(event.item)
                          },
                          {id: 'pre-made', label: 'Pre Made', command: (event) => this.menuHandler(event.item)}
                      ]
                  },
                  {id: 'shirt', label: 'Shirt', command: (event) => this.menuHandler(event.item)},
                  {separator: true},
                  {id: 'pant', label: 'Pant', command: (event) => this.menuHandler(event.item)}
              ]
          }
      ];
      this.menuIterator(this.items);

    // this.miniProducts = [
    //   {
    //     id: '2',
    //     title: 'Product One',
    //     slug: 'product-slug-1',
    //     featured_image: this.pImage,
    //   },
    //   {
    //     id: '2',
    //     title: 'Product One',
    //     slug: 'product-slug-2',
    //     featured_image: this.pImage,
    //   },
    //   {
    //     id: '2',
    //     title: 'Product One',
    //     slug: 'product-slug-3',
    //     featured_image: this.pImage,
    //   },
    //   {
    //     id: '2',
    //     title: 'Product One',
    //     slug: 'product-slug-4',
    //     featured_image: this.pImage,
    //   },
    // ];
  }

  menuIterator(items) {
    items.map(item=>{
      item['command'] = (event) => {
        this.menuHandler(event.item);
      };
      if(item.items) {
        this.menuIterator(item.items);
      }
    });
  }

  menuHandler(e) {
    //const e = event.item;
    this.isLoading = true;
    this.prevCat = e.id;
    console.log('menu clicked', e);
    this.catSearchPlaceholder = 'Search ' + e.label;
    this.catSearchId = e.id;
    // this.productsService.fetchProducts('Bags-and-Travel').subscribe();
    // product fetch for new cat

    if( e.id === 'phone-cover' ){
      this.nav.navigateForward(`/category/phone-cover`);
      this.isPhoneCover = true;
    } else {
      this.isPhoneCover = false;
    }
    this.postCat = e.id;

    this.fetchProductByCat(e.id);

  }
  fetchProductByCat(slug) {
    console.log('naim');
    this.productsService.fetchProductsByCat('Bags-and-Travel').subscribe(()=>{
      this.isLoading = false;
      return true;
    });
  }

  onClickProduct(index) {
    console.log('category index', index);
  }

  onSearch(event) {
    console.log('new event created: ', event);
    this.searchData = event;
  }

  onSelectModel(event) {
    console.log('phone model : ', event);
    this.mockImage = event.img;
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
