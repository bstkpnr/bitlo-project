import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://akademi-cp.bitlo.com/api/interview/auth';
  private token = 'HKKBITLO123TOKENABC';

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
  userProfil(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/me`, {}, this.httpOptions());
  }

  userBalance():Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/balances`,{},this.httpOptions());
  }

  userOpenOrders():Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/open-orders`,{},this.httpOptions());
  }



  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
