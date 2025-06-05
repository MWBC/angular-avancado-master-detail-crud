import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { IMaskModule } from 'angular-imask';

import { DatePickerModule } from 'primeng/datepicker';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form.component';

@Component({
  selector: 'app-entry-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, IMaskModule, DatePickerModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> {

  imaskConfig = {

    mask: Number, 
    scale: 2, 
    thousandsSeparator: '', 
    padFractionalZeros: true, 
    normalizeZeros: true, 
    radix: ','
  };

  categories!: Category[];
  
  constructor(
    
    protected entryService: EntryService, 
    protected categoryService: CategoryService, 
    protected override injector: Injector

  ) {

    super(injector, entryService);
  }

  override ngOnInit(): void {
    
    this.setCurrentAction();
    
    this.buildResourceForm();

    this.loadResource();

    this.loadCategories();
  }

  get typeOption(): Array<any> {

    return Object.entries(Entry.types).map(

      ([value, text]) => {

        return {

          text: text, 
          value: value
        };
      }
    );
  }

  protected buildResourceForm(): void {

    this.resourceForm = this.formbuilder.group({

      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]], 
      description: [null], 
      type: ["expense", [Validators.required]], 
      amount: [null, [Validators.required]], 
      date: [null, [Validators.required]], 
      paid: [true, [Validators.required]], 
      categoryId: [null, Validators.required]
    });
  }

  protected loadCategories() {

    this.categoryService.getAll().subscribe({

      next: categories => this.categories = categories
    });
  }

  protected override creationPageName(): string {
    
    return 'Cadastro de Novo Lançamento';
  }

  protected override editionPageName(): string {
    
    const entryName = this.resource.name || "";

    return 'Editando Lançamento: ' + entryName;
  }
}
