import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { CommonModule } from '@angular/common';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(
    
    protected categoryService: CategoryService, 
    protected override injector: Injector
  ) {

    super(injector, categoryService);
  }
}
