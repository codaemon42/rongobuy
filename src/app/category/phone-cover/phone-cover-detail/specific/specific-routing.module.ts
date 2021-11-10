import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificPage } from './specific.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificPageRoutingModule {}
