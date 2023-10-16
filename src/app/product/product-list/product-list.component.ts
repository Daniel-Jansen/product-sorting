import { Component, Input } from '@angular/core';
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
      if (data.data && Array.isArray(data.data)) {
        this.items = data.data;
      } else if (Array.isArray(data)) {
        this.items = data;
      } else {
        this.items = [data];
      }

      console.log(this.items);
      console.log(data);
    });
  }
}
