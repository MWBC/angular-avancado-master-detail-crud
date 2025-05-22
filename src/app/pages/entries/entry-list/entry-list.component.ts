import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent implements OnInit{

  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {

    this.entryService.getAll().subscribe({

      next: entries => this.entries = entries, 
      error: () => alert('Erro ao carregar a lista de lançamentos')
    });
  }

  deleteEntry(entry: any) {
    
    const mustDelete = confirm('Deseja realmente deletar esse lançamento?');

    if(mustDelete) {

    this.entryService.delete(entry.id).subscribe({

      next: () => this.entries = this.entries.filter(element => element != entry), 
      error: () => alert('Erro ao tentar excluir lançamento.')
    });
    }
  }
}
