import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { PhoneDisplayComponent } from './phone-display/phone-display.component';
import { PhoneSelectorComponent } from './phone-selector/phone-selector.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TextEditorScreenComponent } from './text-editor-screen/text-editor-screen.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsComponent } from './reviews/reviews.component';
import { CustomizationReviewComponent } from './customization-review/customization-review.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { NgOtpInputModule } from  'ng-otp-input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    ProductComponent,
    SignupComponent,
    YoutubeComponent,
    CustomizationReviewComponent,
    TextEditorScreenComponent,
    PhoneSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ColorPickerModule,
    DropdownModule,
  ],
  exports: [
    FooterComponent,
    ProductComponent,
    SignupComponent,
    YoutubeComponent,
    CustomizationReviewComponent,
    TextEditorScreenComponent,
    PhoneSelectorComponent
  ]
})
export class ComponentsModule { }
