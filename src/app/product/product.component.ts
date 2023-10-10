import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  items : ProductInfo[] = [];
  

  constructor() { 
    // todo: figure out how to have correct part of array to be shown rather than bunch of extra info
  }

  ngOnInit(): void {

  }
}
