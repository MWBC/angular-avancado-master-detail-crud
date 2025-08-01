import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora'

import { routes } from './app.routes';

import { InMemoryDatabase } from './in-memory-database';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideToastr } from 'ngx-toastr';
import { timeoutInterceptor } from './interceptors/timeout.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),  
    providePrimeNG({

      theme: {

        preset: Nora
      }, 
      translation: {

        firstDayOfWeek: 0, 
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], 
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 
          'Outubro', 'Novembro', 'Dezembro'
        ],   
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], 
        today: 'Hoje', 
        clear: 'Limpar'
      }
    }), 
    provideHttpClient(withInterceptors([timeoutInterceptor])), 
    importProvidersFrom([

      // HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
    ]), 
    provideToastr({
      timeOut: 3000, // Tempo de exibição do toast
      positionClass: 'toast-top-right', // Posição na tela
      closeButton: false, // Botão para fechar
      progressBar: true // Barra de progresso
    })
  ]
};
