import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    NavbarComponent, 
    RouterLink, 
    RouterLinkActive,
  ], 
  exports: [

    RouterLink, 
    RouterLinkActive
  ]
})
export class CoreModule { }
