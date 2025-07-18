import { Component } from '@angular/core';
import { CoreModule } from '../../core.module';

@Component({
  selector: 'app-navbar',
  imports: [CoreModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  username: String;

  constructor() {

    this.username = localStorage.getItem('name') != undefined ? localStorage.getItem('name')! : '';
  }
}
