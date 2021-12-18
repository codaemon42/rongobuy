import { FooterModule } from './../../components/footer/footer.module';
import { HeaderModule } from './../../components/modules/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDetailPageRoutingModule } from './page-detail-routing.module';

import { PageDetailPage } from './page-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    FooterModule,
    PageDetailPageRoutingModule
  ],
  declarations: [PageDetailPage]
})
export class PageDetailPageModule {}
