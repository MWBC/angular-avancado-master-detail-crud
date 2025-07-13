import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";
import { FormFieldErrorComponent } from "../../../shared/components/form-field-error/form-field-error.component";
import { LoginService } from '../shared/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, SharedModule, FormFieldErrorComponent], 
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(

    private formBuilder: FormBuilder, 
    private loginService: LoginService, 
    private toastr: ToastrService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({

      username: [null, [Validators.required, Validators.email]], 
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {

    try{

      this.loginService.login(this.loginForm).subscribe({

      next: (response) => {

        this.toastr.success('Login realizado com sucesso!');

        this.router.navigateByUrl('reports');
      }, 
      error: (error) => {
      
        console.log(error)

        if(error.status == 401) {

          this.toastr.error('Usuário ou senha incorretos.');
        }else {

        this.toastr.error(error.error.message);
        }
      }
    });;
    }catch(error) {

      console.log(error);
    }

  }
}
