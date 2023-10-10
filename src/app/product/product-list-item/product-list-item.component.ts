import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/shared/models/productInfo';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() item! : ProductInfo;
  constructor() { }

  ngOnInit(): void {

  }
}
