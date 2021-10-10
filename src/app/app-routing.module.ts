import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'carts',
    loadChildren: () => import('./carts/carts.module').then( m => m.CartsPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'category',
  //   loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  // },
  // {
  //   path: 'shop',
  //   loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  // },
  // {
  //   path: 'search',
  //   loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
