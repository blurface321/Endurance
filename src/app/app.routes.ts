import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Calories } from './components/calories/calories';
import { SleepImpact } from './components/sleep-impact/sleep-impact';
import { GutHealth } from './components/gut-health/gut-health';

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
        path:'features',
        children: [
            {
                path:'calories',
                component: Calories
            },
            {
                path:'sleep-impact',
                component: SleepImpact
            },
            {
                path:'gut-health',
                component: GutHealth
            }
        ]
    }
];
