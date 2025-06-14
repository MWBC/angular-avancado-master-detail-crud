import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form.component';
import { SharedModule } from "../../../shared/shared.module";

@Component({
  imports: [ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  
  breadCrumbLinks: Array<any> = [];

  buttonClass: string;

  buttonText: string;

  buttonLink: string;

  constructor(
    
    protected override injector: Injector, 
    protected categoryService: CategoryService
  ) {

    super(injector, categoryService);

    this.buttonClass = 'btn-light float-end';
    this.buttonLink = '/categories';
    this.buttonText = '<< Voltar';
  }

  override ngAfterContentChecked() {

    this.setTitlePage();

    this.breadCrumbLinks = [{

      'text': 'Categorias', 
      'link': '/categories'
      }, 
      {

        'text': this.pageTitle
      }
    ];
  }

  protected override buildResourceForm(): void {

    this.resourceForm = this.formbuilder.group({

      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]], 
      description: [null]
    });
  }

  protected override creationPageName(): string {
    
    return 'Cadastro de Nova Categoria';
  }

  protected override editionPageName(): string {
    
    const categoryName = this.resource.name || "";

    return 'Editando Categoria: ' + categoryName;
  }
}
