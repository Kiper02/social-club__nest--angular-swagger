import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router)
  const isAuth = authService.checkAuth()
  if(isAuth) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }

};
