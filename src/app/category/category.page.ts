/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MiniProduct } from '../components/product/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  items: MenuItem[];
  menuBackLabel: string;
  catSearchPlaceholder: string;

  //mock
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  pImage = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  miniProducts: MiniProduct[];

  constructor() {}

  ngOnInit() {
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
              command: (event) => {
                this.menuHandler(event.item);
              },
              items: [{
                      id: 't-shirt',
                      label: 'T-Shirt',
                      command: (event) => {
                        this.menuHandler(event.item);
                      },
                      items: [
                          {
                            id: 'customized',
                            label: 'Customized',
                            command: (event) => this.menuHandler(event.item)
                          },
                          {id: 'pre-made', label: 'Pre Made', command: (event) => this.menuHandler(event.item)}
                      ]
                  },
                  {id: 'shirt', label: 'Shirt', command: (event) => this.menuHandler(event.item)},
                  {separator: true},
                  {id: 'pant', label: 'Pant', command: (event) => this.menuHandler(event.item)}
              ]
          },
            {
              id: 'women',
              label: 'Women',
              escape: false,
              command: (event) => {
                this.menuHandler(event.item);
              },
              items: [{
                      id: 't-shirt',
                      label: 'T-Shirt',
                      command: (event) => {
                        this.menuHandler(event.item);
                      },
                      items: [
                          {
                            id: 'customized',
                            label: 'Customized',
                            command: (event) => this.menuHandler(event.item)
                          },
                          {id: 'pre-made', label: 'Pre Made', command: (event) => this.menuHandler(event.item)}
                      ]
                  },
                  {id: 'shirt', label: 'Shirt', command: (event) => this.menuHandler(event.item)},
                  {separator: true},
                  {id: 'pant', label: 'Pant', command: (event) => this.menuHandler(event.item)}
              ]
          },
            {
              id: 'accessories',
              label: 'Accessories',
              escape: false,
              command: (event) => {
                this.menuHandler(event.item);
              },
              items: [{
                      id: 't-shirt',
                      label: 'T-Shirt',
                      command: (event) => {
                        this.menuHandler(event.item);
                      },
                      items: [
                          {
                            id: 'customized',
                            label: 'Customized',
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

    this.miniProducts = [
      {
        id: '2',
        title: 'Product One',
        slug: 'product-slug-1',
        featured_image: this.pImage,
      },
      {
        id: '2',
        title: 'Product One',
        slug: 'product-slug-2',
        featured_image: this.pImage,
      },
      {
        id: '2',
        title: 'Product One',
        slug: 'product-slug-3',
        featured_image: this.pImage,
      },
      {
        id: '2',
        title: 'Product One',
        slug: 'product-slug-4',
        featured_image: this.pImage,
      },
    ];
  }

  menuHandler(e) {
    console.log(e);
    this.catSearchPlaceholder = 'Search ' + e.label;
  }

  onSearch(event) {
    console.log('new event created: ', event);
  }
}
