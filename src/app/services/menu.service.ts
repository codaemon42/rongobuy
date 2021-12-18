/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  fetchMenus() {
    return [
      {
        id: '1',
        icon: 'phone-portrait-sharp',
        title: 'Customize Phone Cover',
        route: 'phone-customizer',
        show: false,
        children: []
      },
      {
        id: '2',
        icon: 'image',
        title: 'Cover Designs',
        route: 'category/phone-cover',
        show: false,
        children: []
      },
      {
        id: '3',
        icon: 'pie-chart',
        title: 'Orders',
        route: 'all/orders',
        show: false,
        children: [
          // {
          //   id: '2',
          //   icon: 'apps',
          //   title: 'Orders',
          //   route: 'all/orders',
          //   children: [
          //     {
          //       id: '3',
          //       icon: 'home',
          //       title: 'Order Tracking',
          //       route: 'pages/order-tracking',
          //       children: []
          //     }
          //   ]
          // },
          // {
          //   id: '1',
          //   icon: 'home',
          //   title: 'About Us',
          //   route: 'pages/about-us',
          //   children: []
          // }
        ]
      },
      {
        id: '4',
        icon: 'radio',
        title: 'Order Tracking',
        route: 'pages/order-tracking',
        show: false,
        children: []
      },
      {
        id: '5',
        icon: 'happy',
        title: 'About Us',
        route: 'pages/about-us',
        show: false,
        children: []
      },
      {
        id: '6',
        icon: 'newspaper',
        title: 'Terms & Conditions',
        route: 'pages/terms-and-conditions',
        show: false,
        children: []
      }
    ];
  }

}
