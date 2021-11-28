import { IonicModule } from '@ionic/angular';
import { CustomizationReviewComponent } from './../../customization-review/customization-review.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CustomizationReviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CustomizationReviewComponent
  ]
})
export class EditorModule { }
