import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';

import { OrderDetailsPageRoutingModule } from './order-details-routing.module';

import { OrderDetailsPage } from './order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelineModule,
    CardModule,
    OrderDetailsPageRoutingModule
  ],
  declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule {}
