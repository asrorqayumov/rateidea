import { Routes } from '@angular/router';
import { authGuard, NoAuthGuard } from '@core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'signup',
    canMatch: [NoAuthGuard],
    loadComponent: () => import('./core/auth/components/sign-up/sign-up.component'),
  },
  {
    path: 'login',
    canMatch: [NoAuthGuard],
    loadComponent: () => import('./core/auth/components/login/login.component'),
  },
  {
    path: 'verify-email',
    canMatch: [NoAuthGuard],
    loadComponent: () => import('./core/auth/components/verify-email/verify-email.component'),
  },
  {
    path: 'home',
    canMatch: [authGuard],
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'saved',
    canMatch: [authGuard],
    loadComponent: () => import('./features/saved-ideas/saved-ideas.component'),
  },
  {
    path: 'my-ideas',
    canMatch: [authGuard],
    loadComponent: () => import('./features/my-ideas/my-ideas.component'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./core/components/not-found/not-found.component'),
  },
  { path: '**', redirectTo: 'not-found' },
];
