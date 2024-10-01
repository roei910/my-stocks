import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';

export function interceptConnection (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let requestTimeoutMs = 3000;

  return next(req).pipe(
    timeout(requestTimeoutMs),
    catchError(() => throwError(() => 'No Internet Connection'))
  );
}