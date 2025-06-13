import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [],
  imports: [
    ReportsRoutingModule, 
    SharedModule, 
    ChartModule
  ], 
  exports: [
    ChartModule
  ]
})
export class ReportsModule { }
