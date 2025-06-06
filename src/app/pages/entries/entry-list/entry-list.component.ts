import { Component, Injector, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { CommonModule } from '@angular/common';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {


  constructor(
    
    protected override injector: Injector, 
    private entryService: EntryService) {

      super(injector, entryService);
    }
}
