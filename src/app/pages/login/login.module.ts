import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule, 
    SharedModule
  ]
})
export class LoginModule { }
