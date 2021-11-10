import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificPageRoutingModule } from './specific-routing.module';

import { SpecificPage } from './specific.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificPageRoutingModule
  ],
  declarations: [SpecificPage]
})
export class SpecificPageModule {}
