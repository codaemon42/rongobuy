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
    CustomOrderPageRoutingModule
  ],
  declarations: [CustomOrderPage]
})
export class CustomOrderPageModule {}
