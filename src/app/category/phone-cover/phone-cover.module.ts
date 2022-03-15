import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCoverPageRoutingModule } from './phone-cover-routing.module';

import { PhoneCoverPage } from './phone-cover.page';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { ChatButtonModule } from 'src/app/components/chat-button/chat-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    DropdownModule,
    ChatButtonModule,
    PhoneCoverPageRoutingModule
  ],
  declarations: [PhoneCoverPage]
})
export class PhoneCoverPageModule {}
