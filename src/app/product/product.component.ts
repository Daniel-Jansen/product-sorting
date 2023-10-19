import { Component, Input } from '@angular/core';
import { ProductService } from './product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() items: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
  filter: any;
}
