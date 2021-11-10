import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverDetailPageRoutingModule } from './phone-cover-detail-routing.module';

import { PhoneCoverDetailPage } from './phone-cover-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PhoneCoverDetailPageRoutingModule
  ],
  declarations: [PhoneCoverDetailPage]
})
export class PhoneCoverDetailPageModule {}
