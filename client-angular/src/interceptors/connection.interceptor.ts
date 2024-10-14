import {
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

export function interceptConnection (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let requestTimeoutMs = 4000;
  let messageService = inject(MessageService);

  return next(req).pipe(
    timeout(requestTimeoutMs),
    catchError((error: HttpErrorResponse) => {
      messageService.add({ severity: 'error', summary: 'Error', detail: error.message });

      return throwError(() => error.message);
    })
  );
};