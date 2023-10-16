import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() items : any;
  uniqueCountries: string[] = [];
  uniqueCategories: string[] = [];
  listFilter : string = '';

  constructor(private productService: ProductService) { }

  filterChanged(value: any) {
    console.log(value);
  }

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
      this.extractUniqueCountryNames();
      this.extractUniqueCategories();
    });
  }

  private extractUniqueCountryNames() {
    this.items.forEach((item: any) => {
      if (!this.uniqueCountries.includes(item.country_name)) {
        this.uniqueCountries.push(item.country_name);
      }
    });

    this.uniqueCountries.sort();
    console.log(this.uniqueCountries);
  }

  private extractUniqueCategories() {
    const allCategories: string[] = [];

    this.items.forEach((item: any) => {
      item.categories.forEach((category: string) => {
        if (!allCategories.includes(category))
        allCategories.push(category);
      });
    });

    this.uniqueCategories = allCategories.sort();
    console.log(this.uniqueCategories);
  }
}
