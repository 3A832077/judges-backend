import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/form' },
  { path: 'form', loadChildren: () => import('./pages/form/form.routes').then(m => m.FormRoutes) },
  { path: 'unparsed', loadChildren: () => import('./pages/unparsed/unparsed.routes').then(m => m.UnparsedRoutes) },
];
