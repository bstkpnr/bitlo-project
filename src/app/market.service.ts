import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Market {
  marketCode: string;
  currentQuote: number;
  change24h: number;
  change24hPercent: number;
  highestQuote24h: number;
  lowestQuote24h: number;
  weightedAverage24h: number;
  baseAsset: string;
  baseAssetLogoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private BASE_URL = 'https://akademi-cp.bitlo.com/api/interview/markets';

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }

  getMarketsData(): Observable<Market[]> {
    return this.http.get<Market[]>(this.BASE_URL);
  }
}
