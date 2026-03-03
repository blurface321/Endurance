import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Blog } from './components/blog/blog';
import { Features } from './components/features/features';
import { Terms } from './components/terms/terms';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path:'about-us',
        component: About
    },
    {
        path:'blog',
        component: Blog
    },
    {
        path:'feature-requests',
        component:Features
    },
    {
        path:'terms-of-service',
        component:Terms
    },
    {
        path:'privacy-policy',
        component:PrivacyPolicy
    }
];
