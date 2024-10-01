import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';
import { ErrorService } from 'src/services/error.service';

export function interceptConnection (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let requestTimeoutMs = 3000;
  let errorService = inject(ErrorService);

  return next(req).pipe(
    timeout(requestTimeoutMs),
    catchError((error: HttpErrorResponse) => {
      errorService.showError(error.message);

      return throwError(() => error.message);
    })
  );
};