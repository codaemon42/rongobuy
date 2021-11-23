import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneDisplayComponent } from '../../phone-display/phone-display.component';



@NgModule({
  declarations: [PhoneDisplayComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PhoneDisplayComponent]
})
export class PhoneDisplayModule { }
