import { Subscription } from 'rxjs';
import { WishlistService } from './../services/wishlist/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Wishlist } from '../models/wishlist.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlists: Wishlist[] = [];
  wishlistSub: Subscription;
  isLoading = true;

  constructor(
    private wishlistService: WishlistService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.wishlistService.fetchWishlist().subscribe(res=>{
      this.isLoading = false;
    });
    this.wishlistSub = this.wishlistService.wishlist.subscribe(wishlists=>{
      this.wishlists = wishlists;
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.wishlistService.fetchWishlist().subscribe(res=>{
      this.isLoading = false;
    });
  }

  addToCart(id, productId, skuId, backgroundImage, phoneDesignId) {
    skuId = skuId ? skuId : productId;
    this.cartService.addTOCart(productId, skuId, 1, backgroundImage, phoneDesignId).subscribe(res=>{
      if(res.success){
        this.wishlistService.deleteWishlist(id).subscribe();
      }
    });
  }

  onDeleteWishItem(id) {
    this.wishlistService.deleteWishlist(id).subscribe();
  }

}
