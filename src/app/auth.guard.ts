import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './pages/login/shared/login.service';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);

  const router = inject(Router);

  let response = loginService.me().subscribe({

    next: (response) => {

      return true;
    }, 
    error: (error) => {

      console.log(response);

      router.navigateByUrl('login');
      
      return false;

    }
  });

  return true;
};
