import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction?: string;
  
  categoryForm!: FormGroup;

  pageTitle?: string;

  serverErrorMessages: string[] = [];

  submittingForm: boolean = false;

  category: Category = new Category();
  
  constructor(
    
    private categoryService: CategoryService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formbuilder: FormBuilder, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.setCurrentAction();
    
    this.buildCategoryForm();

    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    
    this.setTitlePage();
  }

  submitForm() {

    this.submittingForm = true;

    if(this.currentAction == 'new') {

      this.createCategory();
    }else {

      this.updateCategory();
    }
  }

  private setCurrentAction(): void {

    if(this.route.snapshot.url[0].path == 'new') {

      this.currentAction = 'new';
    }else {

      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm(): void {

    this.categoryForm = this.formbuilder.group({

      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]], 
      description: [null]
    });
  }

  private loadCategory(): void {

    if(this.currentAction == 'edit') {

      this.route.paramMap.pipe(

        switchMap(params => this.categoryService.getById(Number(params.get('id'))))
      ).subscribe({

        next: category => {
          
          this.category = category;

          this.categoryForm.patchValue(category);
        }, 
        error: error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      });
    }
  }

  private setTitlePage(): void {

    if(this.currentAction == 'new') {

      this.pageTitle = 'Cadastro de Nova Categoria'
    }else {

      const categoryName = this.category.name || '';

      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  private createCategory() {

    const category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe({

      next: category => this.actionForSuccess(category), 
      error: error => this.actionForError(error)
    });
  }

  private updateCategory() {

    const category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe({

      next: category => this.actionForSuccess(category), 
      error: error => this.actionForError(error)
    });
  }

  private actionForSuccess(category: Category) {

    this.toastr.success('Solicitação processada com sucesso!');

    this.router.navigate(['categories']);
  }

  private actionForError(error: any) {

    this.toastr.error('Ocorreu um erro ao processar a sua solicitação');

    this.submittingForm = false;

    if(error.status === 422 ) {

      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else {

      this.serverErrorMessages = ['Falha na comunicação com o servidor. Tente novamente mais tarde.'];
    }
  }
}
