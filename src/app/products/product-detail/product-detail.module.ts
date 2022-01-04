import { ChatButtonModule } from './../../components/chat-button/chat-button.module';
import { PipesModule } from './../../pipes/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RatingModule} from 'primeng/rating';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';
import { ProductDetailPage } from './product-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingModule,
    ComponentsModule,
    HttpClientModule,
    PipesModule,
    ChatButtonModule,
    NgOtpInputModule,
    ProductDetailPageRoutingModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
