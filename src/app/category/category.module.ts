import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {PanelMenuModule} from 'primeng/panelmenu';
import { ComponentsModule } from '../components/components.module';

import { CategoryPageRoutingModule } from './category-routing.module';
import { CategoryPage } from './category.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PanelMenuModule,
    CategoryPageRoutingModule
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
