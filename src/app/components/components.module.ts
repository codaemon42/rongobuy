// import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
// import { PhoneDisplayComponent } from './phone-display/phone-display.component';
// import { SearchResultsComponent } from './search-results/search-results.component';
// import { FooterComponent } from './footer/footer.component';
// import { LoginComponent } from './login/login.component';
// import { HeaderComponent } from './header/header.component';
// import {RatingModule} from 'primeng/rating';
// import { ReviewsComponent } from './reviews/reviews.component';
// import { CustomizationReviewComponent } from './customization-review/customization-review.component';
// import { NgOtpInputModule } from  'ng-otp-input';

import { TextEditorScreenComponent } from './text-editor-screen/text-editor-screen.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { PhoneSelectorComponent } from './phone-selector/phone-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ColorPickerModule} from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductComponent,
    SignupComponent,
    YoutubeComponent,
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
    ProductComponent,
    SignupComponent,
    YoutubeComponent,
    TextEditorScreenComponent,
    PhoneSelectorComponent
  ]
})
export class ComponentsModule { }
