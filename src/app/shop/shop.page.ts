/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { MiniProduct } from '../components/product/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  // mock
  miniProducts: MiniProduct[];
  logo = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/52384618_403447716890410_7519901944706498560_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=4vf2J_gHjV4AX9Iw4WH&_nc_ht=scontent.fdac22-1.fna&oh=cc8086e722ec06839a2993d3ac1852a3&oe=6180485F';
  pImage = 'https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6';
  constructor() { }

  ngOnInit() {
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

}
