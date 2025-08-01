import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../pages/login/shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  template: '',
  standalone: true
})
export class LogoutComponent implements OnInit {

  constructor(
    
    private loginService: LoginService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.loginService.logout().subscribe({

      next: (response) => {

        this.router.navigateByUrl('/login');
      }
    });

  }
}
