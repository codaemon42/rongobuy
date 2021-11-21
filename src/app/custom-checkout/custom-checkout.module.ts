import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomCheckoutPageRoutingModule } from './custom-checkout-routing.module';

import { CustomCheckoutPage } from './custom-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomCheckoutPageRoutingModule
  ],
  declarations: [CustomCheckoutPage]
})
export class CustomCheckoutPageModule {}
