import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneCoverDetailPage } from './phone-cover-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneCoverDetailPage
  },
  {
    path: 'specific',
    loadChildren: () => import('./specific/specific.module').then( m => m.SpecificPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneCoverDetailPageRoutingModule {}
