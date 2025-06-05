import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import {UserApiService} from "./user-api.service";

export const UserGuard: CanActivateFn = () => {
  const userApiService = inject(UserApiService);
  const router = inject(Router);
  if (userApiService.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']).then();
    return false;
  }
};

