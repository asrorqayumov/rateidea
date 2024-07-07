import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: 'signup', loadComponent: () => import('./core/auth/components/sign-up/sign-up.component')},
    {path: 'login', loadComponent: () => import('./core/auth/components/login/login.component')},
    {path: 'not-found', loadComponent: () => import('./core/components/not-found/not-found.component')},
    {path: '**', redirectTo: 'not-found'}
];
