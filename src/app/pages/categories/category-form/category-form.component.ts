import { Component, OnInit, AfterContentChecked, Inject, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  
  constructor(
    
    protected override injector: Injector, 
    protected categoryService: CategoryService
  ) {

    super(injector, categoryService);
  }

  protected override buildResourceForm(): void {

    this.resourceForm = this.formbuilder.group({

      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]], 
      description: [null]
    });
  }
}
