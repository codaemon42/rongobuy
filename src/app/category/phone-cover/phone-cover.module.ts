import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverPageRoutingModule } from './phone-cover-routing.module';

import { PhoneCoverPage } from './phone-cover.page';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    DropdownModule,
    PhoneCoverPageRoutingModule
  ],
  declarations: [PhoneCoverPage]
})
export class PhoneCoverPageModule {}
