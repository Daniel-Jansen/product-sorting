import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  @Input() items: any[] = [];
  @Output() filteredItems = new EventEmitter<any>();
  uniqueCountries: string[] = [];
  uniqueCategories: string[] = [];
  listFilterCountry: string = 'All';
  listFilterCategory: string = 'All';

  constructor() {}

  filterChanged(any: any) {
    console.log('Selected Country:', this.listFilterCountry);
    console.log('Selected Category:', this.listFilterCategory);
    const filteredItems = this.items.filter(this.filterCriteria());
    this.filteredItems.emit(filteredItems);
  }

  ngOnInit(): void {
    // executes the appropriate functions to extract unique country names and categories
    this.extractUniqueCountryNames();
    this.extractUniqueCategories();
    // when page is loaded, sets the filter to 'All'
    this.filterChanged('All');
  }

  // the filter check function
  public filterCriteria() {
    return (item: any) => {
      // if the filter is set to 'All', returns all items
      if (this.listFilterCountry === 'All' && this.listFilterCategory === 'All')
        return true;

      // if the filter is set to a country and 'All' for category, returns all items from that country
      if (
        this.listFilterCountry !== 'All' &&
        this.listFilterCategory === 'All'
      ) {
        return item.country_name === this.listFilterCountry&&console.log(item);
      }

      // if the filter is set to 'All' for country and a category, returns all items from that category
      if (
        this.listFilterCountry === 'All' &&
        this.listFilterCategory !== 'All'
      ) {
        return item.categories.includes(this.listFilterCategory)&&console.log(item);
      }

      // if the filter is set to a country and a category, returns all items from that country and category
      if (
        this.listFilterCountry !== 'All' &&
        this.listFilterCategory !== 'All'
      ) {
        return (
          item.country_name === this.listFilterCountry &&
          item.categories.includes(this.listFilterCategory)&&console.log(item)
        );
      }
    };
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
