import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { CommonModule } from '@angular/common';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list.component';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, CommonModule, SharedModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  breadCrumbLinks: Array<any>;

  buttonClass: string;

  buttonText: string;

  buttonLink: string;

  pageTitle: string;

  constructor(
    
    protected categoryService: CategoryService, 
    protected override injector: Injector
  ) {

    super(injector, categoryService);

    this.breadCrumbLinks = [{

      'text': 'Categorias'
    }];

    this.buttonClass = 'btn-success float-end';
    this.buttonLink = 'new';
    this.buttonText = '+ Nova Categoria';
    this.pageTitle = 'Categorias';
  }
}
