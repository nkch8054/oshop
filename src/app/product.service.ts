import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  public getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products').snapshotChanges().pipe(
      map(changes => changes.map(snapshot => {
        let product = snapshot.payload.val();
        product.key = snapshot.key;
        return product;
      })
      )
    );
  }

  public get(id: string): Observable<Product> {
    return this.db.object<Product>('/products/' + id).valueChanges();
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    this.db.object('/products/' + productId).remove();
  }
}
