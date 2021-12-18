import { OrderVideoModule } from './../../components/video/order-video/order-video.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomOrderPageRoutingModule } from './custom-order-routing.module';

import { CustomOrderPage } from './custom-order.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OrderVideoModule,
    CustomOrderPageRoutingModule
  ],
  declarations: [CustomOrderPage]
})
export class CustomOrderPageModule {}
