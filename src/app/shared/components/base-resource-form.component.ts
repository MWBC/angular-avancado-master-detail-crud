import { OnInit, AfterContentChecked, Injector, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { BaseResourceModel } from '../models/base-resource.model';
import { BaseResourceService } from '../services/base-resource.service';
import { CommonModule } from '@angular/common';
import { JSON_TO_RESOURCE_FN, RESOURCE_MODEL } from '../shared.module';

@Component({

    standalone: true, 
    template: ''
})
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction?: string;
  
  resourceForm!: FormGroup;

  pageTitle?: string;

  serverErrorMessages: string[] = [];

  submittingForm: boolean = false;

  protected route: ActivatedRoute;

  protected router: Router;

  protected formbuilder: FormBuilder; 

  protected toastr: ToastrService;

  protected resource: BaseResourceModel;

  protected jsonDataToResourceFn: (jsonData: any) => T;

  constructor(
    
    protected injector: Injector, 
    protected resourceService: BaseResourceService<T>, 
  ) {

    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.formbuilder = injector.get(FormBuilder);
    this.toastr = injector.get(ToastrService);

    this.resource = injector.get(RESOURCE_MODEL);

    this.jsonDataToResourceFn = injector.get(JSON_TO_RESOURCE_FN);
  }

  ngOnInit(): void {
    
    this.setCurrentAction();
    
    this.buildResourceForm();

    this.loadResource();
  }

  ngAfterContentChecked(): void {
    
    this.setTitlePage();
  }

  submitForm() {

    this.submittingForm = true;

    if(this.currentAction == 'new') {

      this.createResource();
    }else {

      this.updateResource();
    }
  }

  protected setCurrentAction(): void {

    if(this.route.snapshot.url[0].path == 'new') {

      this.currentAction = 'new';
    }else {

      this.currentAction = 'edit';
    }
  }

  protected abstract buildResourceForm(): void;

  protected loadResource(): void {

    if(this.currentAction == 'edit') {

      this.route.paramMap.pipe(

        switchMap(params => this.resourceService.getById(Number(params.get('id'))))
      ).subscribe({

        next: resource => {
          
          this.resource = resource;

          this.resourceForm.patchValue(resource);
        }, 
        error: error => alert('Ocorreu um erro no servidor, tente mais tarde.')
      });
    }
  }

  protected setTitlePage(): void {

    if(this.currentAction == 'new') {

      this.pageTitle = this.creationPageName();
    }else {

      this.pageTitle = this.editionPageName();
    }
  }

  protected creationPageName(): string {

    return 'Novo';
  }

  protected editionPageName(): string {

    return 'Edição';
  }

  protected createResource() {

    const resource = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe({

      next: resource => this.actionForSuccess(resource), 
      error: error => this.actionForError(error)
    });
  }

  protected updateResource() {

    const resource = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe({

      next: resource => this.actionForSuccess(resource), 
      error: error => this.actionForError(error)
    });
  }

  private actionForSuccess(resource: BaseResourceModel) {

    this.toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath = this.route.snapshot.parent?.url[0].path;

    this.router.navigate([baseComponentPath]);
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
