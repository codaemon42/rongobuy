import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountGuard } from '../account/account.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'category',
        //@since 1.5.8
        loadChildren: () => import('../category/phone-cover/phone-cover.module').then(m => m.PhoneCoverPageModule)
        // @since 1.5.7
        //loadChildren: () => import('../category/category.module').then(m => m.CategoryPageModule)
      },
      {
        path: 'carts',
        loadChildren: () => import('../carts/carts.module').then(m => m.CartsPageModule),
        canActivate:[AccountGuard],
      },
      {
        path: 'wishlist',
        loadChildren: () => import('../wishlist/wishlist.module').then(m => m.WishlistPageModule),
        canActivate:[AccountGuard],
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
      // {
      //   path: 'tab1',
      //   loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      // },
      // {
      //   path: 'tab2',
      //   loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      // },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
