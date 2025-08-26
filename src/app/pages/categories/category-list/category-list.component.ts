import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { CommonModule } from '@angular/common';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, CommonModule, SharedModule, PaginatorModule],
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

  override ngOnInit(): void {

    this.resourceService.getAllPaginated(0, 10).subscribe({

      next: resources => {

        this.resources = resources.content;
        this.totalRecords = resources.totalElements;

        this.rows = resources.size;
      }, 
      error: () => alert('Erro ao carregar a lista de recursos')
    });
  }

  onPageEvent(event: any) {

    this.first = event.first;

    this.rows = event.rows;

    this.resourceService.getAllPaginated(event.page, this.rows).subscribe({

      next: resources => {

        this.resources = resources.content;
        this.totalRecords = resources.totalElements;

        this.rows = resources.size;
      }, 
      error: () => alert('Erro ao carregar a lista de recursos')
    });
  }
}
