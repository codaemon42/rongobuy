import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountGuard } from './account/account.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'all/orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canActivate:[AccountGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'carts',
    loadChildren: () => import('./carts/carts.module').then( m => m.CartsPageModule),
    canActivate:[AccountGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule),
    canActivate:[AccountGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'phone-customizer',
    loadChildren: () => import('./phone-customizer/phone-customizer.module').then( m => m.PhoneCustomizerPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'review/:productId',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule),
    canActivate:[AccountGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'custom-checkout',
    loadChildren: () => import('./custom-checkout/custom-checkout.module').then( m => m.CustomCheckoutPageModule)
  }

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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
