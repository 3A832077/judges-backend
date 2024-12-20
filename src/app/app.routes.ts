import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/table' },
  { path: 'table', loadChildren: () => import('./pages/table/table.routes').then(m => m.TableRoutes) },
];
