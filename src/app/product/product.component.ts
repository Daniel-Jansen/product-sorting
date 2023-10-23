import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from './product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() items: any[] = [];
  @Input() filteredItems: any[] = [];

  constructor(private productService: ProductService) {}

  // updates the filtered items when selector is changed
  updateFilteredItems(filteredItems: any[]) {
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
      .subscribe((data: any) => {
        if (data.data && Array.isArray(data.data)) {
          this.items = data.data;
        } else if (Array.isArray(data)) {
          this.items = data;
        } else {
          this.items = [data];
        }
      });
  }
}
