import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomOrderPage } from './custom-order.page';

const routes: Routes = [
  {
    path: '',
    component: CustomOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomOrderPageRoutingModule {}
