import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

export const connectedUserGuard: CanActivateFn = (route, state) => {
  var userService = inject(UserService);
  var router = inject(Router);

  if(userService.isUserConnected())
    return true;

  router.navigate(['/login']);

  return false;
};