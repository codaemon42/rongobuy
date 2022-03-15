import { RouterModule } from '@angular/router';
import { HeaderModule } from './../../components/modules/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { OfferPageRoutingModule } from './offer-routing.module';

import { OfferPage } from './offer.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HeaderModule,
    OfferPageRoutingModule
  ],
  declarations: [OfferPage]
})
export class OfferPageModule {}
