import { Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Validators, ReactiveFormsModule } from '@angular/forms';


import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { IMaskModule } from 'angular-imask';

import { DatePickerModule } from 'primeng/datepicker';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form.component';
import { SharedModule } from "../../../shared/shared.module";

@Component({
  imports: [ReactiveFormsModule, IMaskModule, DatePickerModule, SharedModule],
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
  
  breadCrumbLinks: Array<any> = [];

  buttonClass: string;

  buttonText: string;

  buttonLink: string;

  constructor(
    
    protected entryService: EntryService, 
    protected categoryService: CategoryService, 
    protected override injector: Injector

  ) {

    super(injector, entryService);

      this.buttonClass = 'btn-success float-end';
      this.buttonLink = 'new';
      this.buttonText = '+ Novo Lançamento';
  }

  override ngOnInit(): void {
    
    this.setCurrentAction();
    
    this.buildResourceForm();

    this.loadResource();

    this.loadCategories();
  }

  override ngAfterContentChecked() {

    this.setTitlePage();

    this.breadCrumbLinks = [{

      'text': 'Lançamentos', 
      'link': '/entries'
      }, 
      {

        'text': this.pageTitle
      }
    ];
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
