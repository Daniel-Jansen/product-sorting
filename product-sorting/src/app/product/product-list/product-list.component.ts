import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() items! : ProductInfo;
}
