import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  imports: [],
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrl: './form-field-error.component.css'
})

export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl?: AbstractControl;

  constructor() {

    this.formControl = new FormControl();
  }

  ngOnInit(): void {
    
  }

  public get errorMessage(): string | null {

    if(this.mustShowErrorMessage()) {

      return this.getErrorMessage();
    }

    return null;
  }

  private mustShowErrorMessage(): boolean {

    return this.formControl!.invalid && this.formControl!.touched;
  }

  private getErrorMessage(): string | null {

    if(this.formControl?.errors?.['required']) {

      return 'Dado obrigatório';
    }else if(this.formControl?.errors?.['minlength']) {

      const minLength = this.formControl?.errors?.['minlength'].requiredLength;

      return `Deve ter o mínimo de ${minLength} caracteres`;
    }

    return null;
  }
}
