import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() items : ProductInfo[] = [];

  constructor(private ProductService: ProductService) { }

  // create filter with event listeners

  ngOnInit(): void {
    this.ProductService.getProducts().pipe(
      catchError((error: any) => {
        alert(error.message);
        throw error;
      })
    ).subscribe((data : any) => {
      if (Array.isArray(data)) {
        this.items = data;
      } else {
        this.items = [data];
      }
    });
  }
}
