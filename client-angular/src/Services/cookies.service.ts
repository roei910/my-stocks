import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  /**
   * Get a cookie value by name
   * @param name The name of the cookie
   * @returns The value of the cookie, or null if not found
   */
  getCookie(name: string): string | null {
    const foundCookies = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    const cookie = foundCookies?.pop();

    return cookie ? cookie : null;
  }

  /**
   * Create a new cookie
   * @param name The name of the cookie
   * @param value The value of the cookie
   * @param days The number of days until the cookie expires (optional)
   */
  setCookie(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  /**
   * Delete a cookie
   * @param name The name of the cookie
   */
  deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
}
