import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HammerModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import {DropdownModule} from 'primeng/dropdown';
import {SpeedDialModule} from 'primeng/speeddial';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

// particular imports for hammer
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG}
from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
    pan: { direction: Hammer.DIRECTION_ALL },
  };
}

import { PhoneCustomizerPageRoutingModule } from './phone-customizer-routing.module';

import { PhoneCustomizerPage } from './phone-customizer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropdownModule,
    SpeedDialModule,
    ProgressSpinnerModule,
    RippleModule,
    ToastModule,
    HammerModule,
    PhoneCustomizerPageRoutingModule
  ],
  declarations: [PhoneCustomizerPage],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig,},
    FileTransfer,
    FileTransferObject,
    File
  ]
})
export class PhoneCustomizerPageModule {}
