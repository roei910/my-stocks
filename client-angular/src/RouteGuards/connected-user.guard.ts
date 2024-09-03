import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'services/authentication.service';

export const connectedUserGuard: CanActivateFn = (route, state) => {
  var router = inject(Router);
  var authenticationService = inject(AuthenticationService);

  if(authenticationService.isUserConnected())
    return true;

  router.navigate(['/login']);

  return false;
};