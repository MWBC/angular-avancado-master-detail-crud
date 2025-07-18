import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './pages/login/shared/login.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);

  const router = inject(Router);

  let response = loginService.me().subscribe({

    next: (response) => {

      return true;
    }, 
    error: (error) => {

      console.log(error);

      router.navigateByUrl('login');
      
      return false;
    }
  });

  return true;
};
