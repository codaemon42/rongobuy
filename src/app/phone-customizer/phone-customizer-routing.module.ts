import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneCustomizerPage } from './phone-customizer.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneCustomizerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneCustomizerPageRoutingModule {}
