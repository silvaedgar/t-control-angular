import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this._loginService.getToken();
    if (token != null && token != '') {
      authRequest = authRequest.clone({
        setHeaders : { Authorization: 'Bearer '+ token }
      })
    }

    return next.handle(authRequest);
  }
}
