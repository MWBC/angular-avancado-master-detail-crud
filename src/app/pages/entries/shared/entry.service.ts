import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    
    protected override injector: Injector, 
    private categoryService: CategoryService
  ) { 

    super('api/entries', injector);
  }

  override create(entry: Entry): Observable<Entry> {

    return this.categoryService.getById(entry.categoryId!).pipe(

      mergeMap(category => {

        entry.category = category;

        return super.create(entry);
      })
    );
  }

  override update(entry: Entry): Observable<Entry> {

    const url = `${this.apiPath}/${entry.id}}`;

    return this.categoryService.getById(entry.categoryId!).pipe(

      mergeMap(category => {

        entry.category = category;

        return super.update(entry);
      })
    );
  }

  protected override jsonDataToResources(jsonData: any[]): Entry[] {

    const entries: Entry[] = [];

    jsonData.forEach(element => {
      
      const entry = Entry.fromJson(element);

      entries.push(entry);
    });

    return entries;
  }

  protected override jsonDataToResource(jsonData: any): Entry {

    const entry = Entry.fromJson(jsonData);

    return entry;
  }
}
