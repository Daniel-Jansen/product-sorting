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
  @Input() items : ProductInfo[] = [];

  constructor(private productService: ProductService) {

  }
  
  ngOnInit(): void {
    // uses soon-to-be depricated method with .subscribe
    // this.productService.getProducts().subscribe(
    //   (data : any) => {
    //     this.items = data;
    //   },
    //   (error : any) => {
    //     alert(error.message);
    //   },
    // );

    this.productService.getProducts().pipe(
      catchError((error: any) => {
        alert(error.message);
        throw error;
      })
    ).subscribe((data : any) => {
        this.items = data;
      }
    );
  }
}
