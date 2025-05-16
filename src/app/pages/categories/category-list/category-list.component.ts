import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {

    this.categoryService.getAll().subscribe({

      next: categories => this.categories = categories, 
      error: () => alert('Erro ao carregar a lista de categorias')
    });
  }

  deleteCategory(category: any) {
    
    const mustDelete = confirm('Deseja realmente deletar essa categoria?');

    if(mustDelete) {

    this.categoryService.delete(category.id).subscribe({

      next: () => this.categories = this.categories.filter(element => element != category), 
      error: () => alert('Erro ao tentar excluir categoria.')
    });
    }
  }
}
