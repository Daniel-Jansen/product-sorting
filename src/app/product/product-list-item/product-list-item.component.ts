import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() item : any;

  constructor() { }
}
