import { YoutubeComponent } from './youtube/youtube.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    SignupComponent,
    LoginComponent,
    YoutubeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    SignupComponent,
    LoginComponent,
    YoutubeComponent
  ]
})
export class ComponentsModule { }
