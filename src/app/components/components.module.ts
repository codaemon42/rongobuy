import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    SignupComponent,
    LoginComponent
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
    LoginComponent
  ]
})
export class ComponentsModule { }
