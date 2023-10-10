import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() items : ProductInfo[] = [];
  

  constructor(private productService: ProductService) { 
    // todo: figure out how to have correct part of array to be shown rather than bunch of extra info
    console.log('items:', this.items);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data : any) => {
        this.items = data;
      },
      (error : any) => {
        alert(error.message);
      },
    );
  }
}
