import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-reports',
  imports: [SharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  breadCrumbLinks: Array<any> = [];

  pageTitle: string;

  constructor() {

    this.breadCrumbLinks = [

      {

        'text': 'Relatório de Receitas e Despesas'
      }
    ];

    this.pageTitle = 'Relatório de Receitas e Despesas';
  }

  generateReports(){}
}
