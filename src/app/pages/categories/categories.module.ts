import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

import { SharedModule, RESOURCE_MODEL, JSON_TO_RESOURCE_FN } from '../../shared/shared.module';
import { Category } from './shared/category.model';

@NgModule({
  declarations: [],
  imports: [
    CategoriesRoutingModule, 
    CategoryFormComponent, 
    CategoryListComponent, 
    SharedModule
  ], 
  providers: [

    {

      provide: RESOURCE_MODEL, useValue: new Category()
    }, 
    {

      provide: JSON_TO_RESOURCE_FN, useValue: Category.fromJson
    }
  ]
})
export class CategoriesModule { }
