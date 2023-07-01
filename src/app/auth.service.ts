import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://akademi-cp.bitlo.com/api/interview/auth';
  private token = 'HKKBITLO123TOKENABC';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-bitlo-auth': this.token,
      }),
    };
  }
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const res = {
      identifier: username,
      password: password,
    };

    return this.http.post(`${this.BASE_URL}/login`, res);
  }
  

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }
  userProfil(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/me`, {}, this.httpOptions());
  }

  userBalance():Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/balances`,{},this.httpOptions());
  }

  userOpenOrders():Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/open-orders`,{},this.httpOptions());
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
