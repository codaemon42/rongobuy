import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {DividerModule} from 'primeng/divider';

import { CartsPageRoutingModule } from './carts-routing.module';

import { CartsPage } from './carts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DividerModule,
    CartsPageRoutingModule
  ],
  declarations: [CartsPage]
})
export class CartsPageModule {}
