import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() items : any[] = [];

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.productService.getProducts().pipe(
      catchError((error : any) => {
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
