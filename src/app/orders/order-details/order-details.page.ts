import { Component, OnInit } from '@angular/core';
import {PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  events1;
  constructor() { }

  ngOnInit() {
        this.events1 = [
      {
        status: 'Ordered',
        done: true,
        working: true,
        date: '15/10/2020 10:30',
        icon: 'cart',
        color: '#9C27B0',
        image: 'game-controller.jpg',
        waiting: 'Order is pending',
        success: 'Order has been placed successfully'
      },
      {
        status: 'Processing',
        done: true,
        working: true,
        date: '15/10/2020 14:00',
        icon: 'settings',
        color: '#673AB7',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      },
      {
        status: 'Shipped',
        done: false,
        working: true,
        date: '15/10/2020 16:15',
        icon: 'bus',
        color: '#FF9800',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      },
      {
        status: 'Delivered',
        done: false,
        working: false,
        color: '#607D8B',
        date: '16/10/2020 10:00',
        icon: 'checkmark-done-outline',
        waiting: 'Order hasn\'t processed yet',
        ongoing: 'Order is processing',
        success: 'order has been processed successfully'
      }
    ];
  }

}
