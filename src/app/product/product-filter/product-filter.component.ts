import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductInfo } from 'src/shared/models/productInfo';

const filters = [
  (item: ProductInfo) => item,
  (item: ProductInfo) => item.country_name.includes('France'),
  (item: ProductInfo) => item.country_name.includes('Spain'),
];

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  @Input() items: any;
  @Input() filter: any;
  @Output() filterChange = new EventEmitter<any>();
  uniqueCountries: string[] = [];
  uniqueCategories: string[] = [];
  listFilter: string = 'All';

  constructor(private productService: ProductService) {}

  filterChanged(value: any) {
    console.log('Selected Country:', value);
    this.filter = filters[value];
    this.filterChange.emit(this.filter);
  }

  ngOnInit(): void {
    this.extractUniqueCountryNames();
    this.extractUniqueCategories();
    this.filterChanged('');
  }

  // extracts unique country names from the items array
  private extractUniqueCountryNames() {
    this.items.forEach((item: any) => {
      if (!this.uniqueCountries.includes(item.country_name)) {
        this.uniqueCountries.push(item.country_name);
      }
    });

    this.uniqueCountries.sort();
    console.log(this.uniqueCountries);
  }

  // extracts unique categories from the items array
  private extractUniqueCategories() {
    this.items.forEach((item: any) => {
      item.categories.forEach((category: string) => {
        if (!this.uniqueCategories.includes(category))
          this.uniqueCategories.push(category);
      });
    });

    this.uniqueCategories.sort();
    console.log(this.uniqueCategories);
  }
}
