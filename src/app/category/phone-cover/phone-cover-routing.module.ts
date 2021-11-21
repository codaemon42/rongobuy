import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneCoverPage } from './phone-cover.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneCoverPage
  },
  {
    path: 'phone-cover-detail/:slug',
    loadChildren: () => import('./phone-cover-detail/phone-cover-detail.module').then( m => m.PhoneCoverDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneCoverPageRoutingModule {}
