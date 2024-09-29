import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, startWith, switchMap, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  private connectivitySubject = new BehaviorSubject<boolean>(false);
  private checkUrl = 'https://www.cloudflare.com/cdn-cgi/trace';
  private checkIntervalMs = 5000;
  private requestTimeoutMs = 3000;

  constructor(private http: HttpClient) {
    // interval(this.checkIntervalMs)
    //   .pipe(
    //     startWith(0),
    //     switchMap(() => this.checkInternetConnection())
    //   )
    //   .subscribe(isOnline => {
    //     this.connectivitySubject.next(isOnline);
    //   });
  }

  get isConnected(): Observable<boolean> {
    return this.connectivitySubject.asObservable();
  }

  private checkInternetConnection(): Observable<boolean> {
    return this.http.get(this.checkUrl, { responseType: 'text' }).pipe(
      timeout(this.requestTimeoutMs),
      map(() => true),
      catchError(() => [false])
    );
  }
}