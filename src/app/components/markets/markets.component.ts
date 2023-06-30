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
  positiveChange24hPercent: number = 0;
  maxIncreaseChange24hPercent: Markets | null = null;
  maxDecreaseChange24hPercent: Markets | null = null;
  over10kCurrentQuote: number = 0;
  under1CurrentQuote: number = 0;
  avgMarketPrice: number = 0;
  btcToUsdRate: number = 0;

  displayedColumns: string[] = [
    'index',
    'marketCode',
    'currentQuote',
    'change24h',
    'change24hPercent',
    'highestQuote24h',
    'lowestQuote24h',
  ];

  constructor(private marketService: MarketService,  private router: Router) {}


  parseNumber(value: string): number {
    return Number(value.replace(/,/g, ''));
  }
  
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
      this.markets = markets.map((market:Markets) => ({
        ...market,
        currentQuote: Number(market.currentQuote),
        change24h: Number(market.change24h),
        change24hPercent:Number(market.change24hPercent),
        highestQuote24h: Number(market.highestQuote24h),
        lowestQuote24h: Number(market.lowestQuote24h),
        weightedAverage24h: Number(market.weightedAverage24h),
        volume24h: Number(market.volume24h)
      }));
      this.filterMarketData = [...this.markets];
      this.getPositiveChange24hPercent();
    this.getMaxIncreaseAndDecreaseMarkets();
    this.getMarketsCounts();
    this.getAvgMarketPrice();
    this.getBtcToUsdRate();
    });
  }
  
  navigateToMarketDetail(marketCode: string) {
    this.router.navigate(['/market', marketCode]);
  }
  getPositiveChange24hPercent(): void {
    this.positiveChange24hPercent = this.markets.filter(market => Number(market.change24hPercent )> 0).length;
  }

  getMaxIncreaseAndDecreaseMarkets(): void {
    this.maxIncreaseChange24hPercent = this.markets.reduce((max, market) => Number(market.change24hPercent) > Number(max.change24hPercent) ? market : max, this.markets[0]);
    this.maxDecreaseChange24hPercent = this.markets.reduce((min, market) => Number(market.change24hPercent) <Number(min.change24hPercent) ? market : min, this.markets[0]);
  }

  getMarketsCounts(): void {
    this.over10kCurrentQuote = this.markets.filter(market => Number(market.currentQuote) > 10000).length;
    this.under1CurrentQuote = this.markets.filter(market => Number(market.currentQuote) < 1).length;
  }

  getAvgMarketPrice(): void {
    let total = this.markets.reduce((sum, market) => sum + Number(market.currentQuote), 0);
    this.avgMarketPrice = total / this.markets.length;
  }

  getBtcToUsdRate(): void {
    const btcTryMarket = this.markets.find(market => market.marketCode === "BTC-TRY");
    const usdtTryMarket = this.markets.find(market => market.marketCode === "USDT-TRY");
  
    if (btcTryMarket && usdtTryMarket) {
      this.btcToUsdRate = Number(btcTryMarket.currentQuote) / Number(usdtTryMarket.currentQuote);
    }
  }
}
