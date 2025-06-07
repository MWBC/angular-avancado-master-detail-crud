import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadCrumbItem {

  text: string, 
  link?: string
}

@Component({
  selector: 'app-bread-crumb',
  imports: [RouterLink, CommonModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = [];

  ngOnInit(): void {
    
  }

  isTheLastIndex(item: BreadCrumbItem) {

    const index = this.items.indexOf(item);

    return index + 1 == this.items.length;
  }
}
