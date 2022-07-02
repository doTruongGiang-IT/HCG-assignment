import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}

export const HttpTokenInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpTokenInterceptor,
  multi: true
};
