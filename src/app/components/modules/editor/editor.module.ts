import { LoginModule } from './../login/login.module';
import { IonicModule } from '@ionic/angular';
import { CustomizationReviewComponent } from './../../customization-review/customization-review.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPageModule } from 'src/app/account/account.module';



@NgModule({
  declarations: [
    CustomizationReviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LoginModule
  ],
  exports: [
    CustomizationReviewComponent
  ]
})
export class EditorModule { }
