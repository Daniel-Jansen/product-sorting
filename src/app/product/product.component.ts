import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from './product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent {
  @Input() items: Product[] = [];
  @Input() filteredItems: Product[] = [];

  constructor(private productService: ProductService) {}

  // updates the filtered items when selector is changed
  updateFilteredItems(filteredItems: Product[]) {
    this.filteredItems = filteredItems;
  }

  ngOnInit(): void {
    // calls upon the service to get the products which is then shared throughout all components
    this.productService
      .getProducts()
      .pipe(
        catchError((error: any) => {
          alert(error.message);
          throw error;
        })
      )
      .subscribe((data: Product[]) => {
        this.items = data;
      });
  }
}

export interface Product {
  name: string;
  country_name: string;
  currency: string;
  categories: string[];
  packages: RangeInfo;
}

export interface RangeInfo {
  max: number;
}