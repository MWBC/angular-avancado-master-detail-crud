import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriesRoutingModule, 
    CategoryFormComponent, 
    CategoryListComponent
  ]
})
export class CategoriesModule { }
