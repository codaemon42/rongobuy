import { ChatButtonModule } from './../components/chat-button/chat-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { FooterModule } from './../components/footer/footer.module';
import { HeaderModule } from './../components/modules/header/header.module';

// import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderModule,
    FooterModule,
    ChatButtonModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
