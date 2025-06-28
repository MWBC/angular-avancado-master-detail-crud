import { Injectable, Injector } from '@angular/core';

import { Category } from './category.model';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

import { enviroment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected override injector: Injector) { 
    
    super(enviroment.apiBaseUrl + "api/categories", injector, Category.fromJson);
  }
}
