import { inject, Injectable } from '@angular/core';
import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { Login } from './login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(

    private http: HttpClient, 
  ) {}

  login(loginForm: FormGroup): Observable<Object> {

    let data = {

      'email': loginForm.get('username')?.value, 
      'password': loginForm.get('password')?.value
    };

    return this.http.post(enviroment.apiBaseUrl + 'api/auth/login', data, {withCredentials: true});
  }

  me(): Observable<Object> {

    return this.http.get(enviroment.apiBaseUrl + 'api/auth/me', {withCredentials: true, headers: new HttpHeaders({timeout: 10000})});
  }

  logout(): Observable<Object> {

    localStorage.clear();
    
    return this.http.post(enviroment.apiBaseUrl + 'api/auth/logout', {}, {withCredentials: true});
  }

  isAuthorized(response: any) {

    return response.enabled;
  }
}
