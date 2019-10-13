import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { ICategory } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  public categories$: Observable<ICategory[]>;
  public product: Product;
  private id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categroyService: CategoryService,
    private productService: ProductService) {
    this.product = { title: '', category: '', imageUrl: '', price: 0, key: null };

    this.categories$ = this.categroyService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1))
      .subscribe(product => this.product = product);
  }

  save(product: Product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

  delete() {
    if (!confirm('Do you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }

}
