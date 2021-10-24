import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderTrackingPageRoutingModule } from './order-tracking-routing.module';

import { OrderTrackingPage } from './order-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OrderTrackingPageRoutingModule
  ],
  declarations: [OrderTrackingPage]
})
export class OrderTrackingPageModule {}
