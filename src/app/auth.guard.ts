import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './pages/login/shared/login.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {

  const loginService = inject(LoginService);

  const router = inject(Router);

  try{

   let response = await firstValueFrom(loginService.me());

   return true;
  }catch(error) {

    router.navigateByUrl('login');

    return false;
  }
};
