import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';

import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWHEIGHT: { [ id: number ]: number } = { 1: 400, 3: 335, 4:350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight = ROWHEIGHT[this.cols];
  cat: string | undefined;
  products: Array<Product> | undefined;
  productSubscription: Subscription | undefined;
  showAmount = '12';
  sort = 'desc';

  constructor (private cartService: CartService, private storeService: StoreService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productSubscription = this.storeService.getAllProducts(this.showAmount, this.sort, this.cat)
    .subscribe((_products) => { this.products = _products })
  }

  onSortByChange(newOrder: string): void {
    this.sort = newOrder;
    this.getProducts()
  }

  onSelectCountChange(newShowAmount: number): void {
    this.showAmount = newShowAmount.toString();
    this.getProducts()
  }

  onColumnsCountChange(newColumnsCount: number): void {
    this.cols = newColumnsCount;
    this.rowHeight = ROWHEIGHT[newColumnsCount]
  }

  onCategoryChange(category: string): void {
    this.cat = category;
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      quantity: 1,
      price: product.price,
      id: product.id
    })
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe()
  }
}
