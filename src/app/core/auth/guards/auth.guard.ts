import { CanActivateFn } from '@angular/router';

console.log(1);
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
