import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private BASE_URL = 'https://akademi-cp.bitlo.com/api/interview/markets';

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }
}