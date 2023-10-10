import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductComponent } from './product.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductListItemComponent,
    ProductFilterComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
