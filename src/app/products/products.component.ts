import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../model/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private products: Product[] = [];
  public filteredProducts: Product[] = [];
  public category;
  public cart: any;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParams;
      })
    ).subscribe(params => {
      this.category = params.category;
      this.filteredProducts = this.category ?
        this.products.filter(product => product.category == this.category) :
        this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
