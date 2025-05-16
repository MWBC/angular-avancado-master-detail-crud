import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora'

import { routes } from './app.routes';

import { InMemoryDatabase } from './in-memory-database';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    providePrimeNG({

      theme: {

        preset: Nora
      }
    }), 
    provideHttpClient(), 
    importProvidersFrom([

      HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
    ])
  ]
};
