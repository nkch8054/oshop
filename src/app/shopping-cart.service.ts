import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './model/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './model/shopping-cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/' + cartId).valueChanges()
      .pipe(map(x => new ShoppingCart(x.items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cardId = localStorage.getItem('cartId')
    if (cardId) return cardId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  addToCart(product: Product) {
    this.updateCart(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  private async updateCart(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity = item.payload.val() ? item.payload.val()['quantity'] : 0;
      item$.update({ product: product, quantity: quantity + change });
    });
  }
}
