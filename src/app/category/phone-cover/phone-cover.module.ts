import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverPageRoutingModule } from './phone-cover-routing.module';

import { PhoneCoverPage } from './phone-cover.page';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropdownModule,
    PhoneCoverPageRoutingModule
  ],
  declarations: [PhoneCoverPage]
})
export class PhoneCoverPageModule {}
