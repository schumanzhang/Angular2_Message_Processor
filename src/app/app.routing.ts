import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessorComponent } from './components/processor/processor.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
    {
        path: '',
        component: ProcessorComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);