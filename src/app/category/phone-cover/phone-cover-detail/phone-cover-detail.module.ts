import { RouterModule } from '@angular/router';
import { PhoneDisplayModule } from './../../../components/modules/phone-display/phone-display.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverDetailPageRoutingModule } from './phone-cover-detail-routing.module';

import { PhoneCoverDetailPage } from './phone-cover-detail.page';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    PhoneDisplayModule,
    DropdownModule,
    PhoneCoverDetailPageRoutingModule
  ],
  declarations: [PhoneCoverDetailPage]
})
export class PhoneCoverDetailPageModule {}
