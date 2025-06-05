import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { JSON_TO_RESOURCE_FN, RESOURCE_MODEL, SharedModule } from '../../shared/shared.module';
import { Entry } from './shared/entry.model';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ], 
    providers: [
  
      {
  
        provide: RESOURCE_MODEL, useValue: new Entry()
      }, 
      {
  
        provide: JSON_TO_RESOURCE_FN, useValue: Entry.fromJson
      }
    ]
})
export class EntriesModule { }
