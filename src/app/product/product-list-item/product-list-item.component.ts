import { Component, Input } from '@angular/core';
import { PackageInfo, ProductInfo } from 'src/shared/models/productInfo';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() item! : ProductInfo;

  constructor(private productService: ProductService) { 
    
  }

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      catchError((error : any) => {
        alert(error.message);
        throw error;
      })
    ).subscribe((data : any) => {
        this.item = data;
      }
    );
  }
}
