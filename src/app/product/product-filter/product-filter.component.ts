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

  // sets the default to 'All'
  listFilterCountry: string = 'All';
  listFilterCategory: string = 'All';

  constructor() {}

  // emits the filtered items to parent
  filterChanged(any: any) {
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
    return (items: any) => {
      const filterCategoryLower = this.listFilterCategory.toLowerCase();
      // if the filter is set to 'All', returns all items
      if (this.listFilterCountry === 'All' && this.listFilterCategory === 'All')
        return true;

      // if the filter is set to a country and 'All' for category, returns all items from that country
      if (
        this.listFilterCountry !== 'All' &&
        this.listFilterCategory === 'All'
      ) {
        return items.country_name === this.listFilterCountry;
      }

      // if the filter is set to 'All' for country and a category, returns all items from that category
      if (
        this.listFilterCountry === 'All' &&
        this.listFilterCategory !== 'All'
      ) {
        return items.categories.some(
          (category: string) => category.toLowerCase() === filterCategoryLower
        );
      }

      // if the filter is set to a country and a category, returns all items from that country and category
      if (
        this.listFilterCountry !== 'All' &&
        this.listFilterCategory !== 'All'
      ) {
        return (
          items.country_name === this.listFilterCountry &&
          items.categories.some(
            (category: string) => category.toLowerCase() === filterCategoryLower
          )
        );
      }
    };
  }

  // extracts unique country names
  private extractUniqueCountryNames() {
    this.items.forEach((item: any) => {
      if (!this.uniqueCountries.includes(item.country_name)) {
        this.uniqueCountries.push(item.country_name);
      }
    });

    this.uniqueCountries.sort();
  }

  // extracts unique categories
  private extractUniqueCategories() {
    this.items.forEach((item: any) => {
      item.categories.forEach((category: string) => {
        if (!this.uniqueCategories.includes(category))
          this.uniqueCategories.push(category);
      });
    });

    this.uniqueCategories.sort();
  }
}
