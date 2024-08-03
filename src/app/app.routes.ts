import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'signup',
    loadComponent: () => import('./core/auth/components/sign-up/sign-up.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/components/login/login.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'saved',
    loadComponent: () => import('./features/saved-ideas/saved-ideas.component'),
  },
  {
    path: 'my-ideas',
    loadComponent: () => import('./features/my-ideas/my-ideas.component'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('./core/components/not-found/not-found.component'),
  },
  { path: '**', redirectTo: 'not-found' },
];
