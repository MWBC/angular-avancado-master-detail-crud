import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entry-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction?: string;
  
  entryForm!: FormGroup;

  pageTitle?: string;

  serverErrorMessages: string[] = [];

  submittingForm: boolean = false;

  entry: Entry = new Entry();
  
  constructor(
    
    private entryService: EntryService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formbuilder: FormBuilder, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.setCurrentAction();
    
    this.buildEntryForm();

    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    
    this.setTitlePage();
  }

  submitForm() {

    this.submittingForm = true;

    if(this.currentAction == 'new') {

      this.createEntry();
    }else {

      this.updateEntry();
    }
  }

  private setCurrentAction(): void {

    if(this.route.snapshot.url[0].path == 'new') {

      this.currentAction = 'new';
    }else {

      this.currentAction = 'edit';
    }
  }

  private buildEntryForm(): void {

    this.entryForm = this.formbuilder.group({

      id: [null], 
      name: [null, [Validators.required, Validators.minLength(2)]], 
      description: [null], 
      type: [null, [Validators.required]], 
      amount: [null, [Validators.required]], 
      date: [null, [Validators.required]], 
      paid: [null, [Validators.required]], 
      categoryId: [null, Validators.required]
    });
  }

  private loadEntry(): void {

    if(this.currentAction == 'edit') {

      this.route.paramMap.pipe(

        switchMap(params => this.entryService.getById(Number(params.get('id'))))
      ).subscribe({

        next: entry => {
          
          this.entry = entry;

          this.entryForm.patchValue(entry);
        }, 
        error: error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      });
    }
  }

  private setTitlePage(): void {

    if(this.currentAction == 'new') {

      this.pageTitle = 'Cadastro de Novo Lançamento'
    }else {

      const entryName = this.entry.name || '';

      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }
  }

  private createEntry() {

    const entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry).subscribe({

      next: entry => this.actionForSuccess(entry), 
      error: error => this.actionForError(error)
    });
  }

  private updateEntry() {

    const entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.update(entry).subscribe({

      next: entry => this.actionForSuccess(entry), 
      error: error => this.actionForError(error)
    });
  }

  private actionForSuccess(entry: Entry) {

    this.toastr.success('Solicitação processada com sucesso!');

    this.router.navigate(['entries']);
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
