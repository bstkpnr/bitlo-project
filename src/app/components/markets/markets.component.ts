import { Component, OnInit } from '@angular/core';
import { MarketService } from 'src/app/market.service';
import { Router } from '@angular/router';


export interface Markets {
  index: number;
  marketCode: string;
  currentQuote: string;
  change24h: string;
  change24hPercent: string;
  highestQuote24h: string;
  lowestQuote24h: string;
  weightedAverage24h: string;
  volume24h: string;
}

export type MarketsList = Markets[];

@Component({
  selector: 'markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']

})
export class MarketsComponent implements OnInit {
  markets: Markets[] = [];
  filterMarketData: Markets[] = [];

  displayedColumns: string[] = [
    'index',
    'marketCode',
    'currentQuote',
    'change24h',
    'change24hPercent',
    'highestQuote24h',
    'lowestQuote24h',
  ];
  constructor(private marketService: MarketService,  private router: Router
    ) {}

  ngOnInit(): void {
    this.getMarkets();

  }
  

  filterData(filterVal: string) {
    this.filterMarketData = this.markets.filter((market) =>
      market.marketCode.toLowerCase().includes(filterVal.trim().toLowerCase())
    );
  }

  getMarkets(): void {
    this.marketService.getMarkets().subscribe((markets) => {
      this.markets = markets;
      this.filterMarketData = [...this.markets];
    });
  }
  navigateToMarketDetail(marketCode: string) {
    this.router.navigate(['/market', marketCode]);
  }

  
}
