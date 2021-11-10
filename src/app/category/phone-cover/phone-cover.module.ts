import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverPageRoutingModule } from './phone-cover-routing.module';

import { PhoneCoverPage } from './phone-cover.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PhoneCoverPageRoutingModule
  ],
  declarations: [PhoneCoverPage]
})
export class PhoneCoverPageModule {}
