import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle?: string;

  @Input('button-class') buttonClass?: string;

  @Input('button-text') buttonText?: string;

  @Input('button-link') buttonLink?: string;

  constructor() {}

  ngOnInit(): void {
    
  }
}
