import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

import { Cart, CartItem } from 'src/app/models/cart.model';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe(
        (_cart: Cart) => { 
          this.cart = _cart;
          this.dataSource = this.cart.items
        })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }
  
  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)    
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51NieLkIZXvDDWqBjum6DCHKP1WNtge3qJrwVCCOAh080Db1zxFrNjnhiRhQRxBE1JOLxn9njo3rfGkPlu5rgeEUO00DL5PUpyV');
      stripe?.redirectToCheckout({
        sessionId: res.id // checkout stub returns the stripe session it creates
      })
    })
  }
}