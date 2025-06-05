import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], 
  exports: [

    CommonModule
  ]
})

export class SharedModule { }

export const RESOURCE_MODEL = new InjectionToken<any>('RESOURCE_MODEL');

export const JSON_TO_RESOURCE_FN = new InjectionToken<(jsonData: any) => any>('JSON_TO_RESOURCE_FN');