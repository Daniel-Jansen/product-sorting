import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent {
  @Input() item: any;

  constructor() {}

  // formats the categories array to make it look more readable
  formatCategories(categories: string[]): string {
    return categories.join(', ');
  }
}
