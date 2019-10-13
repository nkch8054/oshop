import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products: Product[];
  filteredProducts: Product[];

  constructor(productSerive: ProductService) {
    productSerive.getAll()
      .subscribe(product => this.filteredProducts = this.products = product);
  }


  filter(query: string) {
    this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

}
