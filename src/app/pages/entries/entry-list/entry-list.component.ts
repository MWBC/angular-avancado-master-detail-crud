import { Component, Injector, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { CommonModule } from '@angular/common';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list.component';
import { SharedModule } from "../../../shared/shared.module";

@Component({
  imports: [RouterLink, CommonModule, SharedModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  breadCrumbLinks: Array<any> = [];

  buttonClass: string;

  buttonText: string;

  buttonLink: string;

  pageTitle: string;

  constructor(
    
    protected override injector: Injector, 
    private entryService: EntryService) {

      super(injector, entryService);

      this.breadCrumbLinks = [
        
        {

          'text': 'Lançamentos'
        }
      ];

      this.buttonClass = 'btn-success float-end';
      this.buttonLink = 'new';
      this.buttonText = '+ Novo Lançamento';
      this.pageTitle = 'Lançamentos';
    }
}
