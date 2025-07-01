import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from '../../../shared/services/base-resource.service';

import { enviroment } from '../../../enviroment';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    
    protected override injector: Injector, 
    private categoryService: CategoryService
  ) { 

    super(enviroment.apiBaseUrl + 'api/entries', injector, Entry.fromJson);
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

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {

    return this.getAll().pipe(

      map(entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {

    return entries.filter(entry => {

      const entryDate = moment(entry.date, 'DD/MM/YYYY');

      const monthMatches = entryDate.month() + 1 == month;

      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) {

        return entry;
      }

      return;
    });
  }
}
