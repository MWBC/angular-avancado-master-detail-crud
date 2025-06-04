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

    super('api/entries', injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {

    return this.setEntryAndSendToServer(entry, super.create.bind(this));
  }

  override update(entry: Entry): Observable<Entry> {

    return this.setEntryAndSendToServer(entry, super.update.bind(this));
  }

  private setEntryAndSendToServer(entry: Entry, sendFn: (a: Entry) => Observable<Entry>): Observable<Entry> {

    return this.categoryService.getById(entry.categoryId!).pipe(

      mergeMap(category => {

        entry.category = category;

        return sendFn(entry);
      }), 
      catchError(this.handleError)
    );
  }
}
