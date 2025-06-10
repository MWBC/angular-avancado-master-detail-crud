import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    BreadCrumbComponent, 
    PageHeaderComponent, 
    FormFieldErrorComponent, 
    ServerErrorMessagesComponent
  ], 
  exports: [

    CommonModule, 
    BreadCrumbComponent, 
    PageHeaderComponent, 
    FormFieldErrorComponent, 
    ServerErrorMessagesComponent
  ]
})

export class SharedModule { }

export const RESOURCE_MODEL = new InjectionToken<any>('RESOURCE_MODEL');

export const JSON_TO_RESOURCE_FN = new InjectionToken<(jsonData: any) => any>('JSON_TO_RESOURCE_FN');