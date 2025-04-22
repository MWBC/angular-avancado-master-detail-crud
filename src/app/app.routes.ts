import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)}
];
