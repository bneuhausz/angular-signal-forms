import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'simple-form',
    loadComponent: () => import('./simple-form'),
  },
  {
    path: 'validated-form',
    loadComponent: () => import('./validated-form'),
  },
  {
    path: 'conditional-form',
    loadComponent: () => import('./conditional-form'),
  },
  {
    path: 'form-with-value',
    loadComponent: () => import('./form-with-value'),
  },
  {
    path: 'cross-validated-form',
    loadComponent: () => import('./cross-validated-form'),
  },
  {
    path: 'async-form',
    loadComponent: () => import('./async-form'),
  },
  {
    path: 'disabled-form',
    loadComponent: () => import('./disabled-form'),
  },
  {
    path: 'schema-form',
    loadComponent: () => import('./schema-form'),
  },
  {
    path: '**',
    redirectTo: 'simple-form',
  }
];
