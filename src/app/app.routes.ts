import { Routes } from '@angular/router';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { LoginLayoutComponent } from './shared/components/login-layout/login-layout.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';

export const routes: Routes = [

    {path: '', component: LoginLayoutComponent, children: [{path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)}, {path: '', redirectTo: '/reports', pathMatch: 'full'}]}, 
    {path: '', component: AppLayoutComponent, children: [

        {path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)}, 
        {path: 'entries', loadChildren: () => import('./pages/entries/entries.module').then(m => m.EntriesModule)}, 
        {path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)}, 
        {path: '', redirectTo: '/reports', pathMatch: 'full'}
    ]}
];
