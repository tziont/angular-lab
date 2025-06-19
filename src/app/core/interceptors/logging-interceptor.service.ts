import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHeaderResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request: ${req.method} ${req.url}`);
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Sent) {
            console.log(
              '%c[Interceptor] Request sent',
              'background:green; color:white'
            );
          } else if (event instanceof HttpHeaderResponse) {
            console.log(
              '%c[Interceptor] Response headers received',
              'color red'
            );
          } else if (event instanceof HttpResponse) {
            console.log(
              '%c[Interceptor] Final response received:',
              'background:green; color:white',
              event
            );
          }
        },
        error: (error) =>
          console.error('%c[Interceptor] Error response:', 'color: red', error),
        complete: () =>
          console.log(
            '%c[Interceptor] Stream completed.',
            'background:#2196f3;color:white'
          ),
      })
    );
  }
}
