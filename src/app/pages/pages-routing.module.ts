import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountGuard } from '../account/account.guard';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  // {
  //   path: 'about-us',
  //   loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule),
  //   canActivate: [AccountGuard]
  // },
  {
    path: 'order-tracking',
    loadChildren: () => import('./order-tracking/order-tracking.module').then( m => m.OrderTrackingPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
  // {
  //   path: 'offer',
  //   loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
  // },
  {
    path: ':slug',
    loadChildren: () => import('./page-detail/page-detail.module').then( m => m.PageDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
