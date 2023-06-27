import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/market.service';

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
export interface Markets extends Market {
  index: number;
}
@Component({
  selector: 'market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.css'],
})
export class MarketDetailComponent implements OnInit {
  marketData: Market | any;
  baseAssetLogoUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private marketService: MarketService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const marketCode = params.get('marketCode');
      if (marketCode) {
        this.getMarketsData(marketCode);
      }
    });
  }

  getMarketsData(marketCode: string): void {
    this.marketService.getMarketsData().subscribe(
      (data: Market[]) => {
        const filteredMarket = data.find(
          (market) => market.marketCode === marketCode
        );
        if (filteredMarket) {
          const baseAsset = marketCode.split('-')[0];

          filteredMarket.marketCode = filteredMarket.marketCode.replace(
            '-',
            ' / '
          );

          this.marketData = filteredMarket;
          console.log(filteredMarket);
          this.baseAssetLogoUrl = this.getBaseAssetLogoUrl(
            baseAsset.toLowerCase()
          );
          console.log('Logo URL:', this.baseAssetLogoUrl);
          console.log('Filtrelenmiş Veriler:', this.marketData);
        }
      },
      (error) => {
        console.log('API Hatası:', error);
      }
    );
  }
  getBaseAssetLogoUrl(baseAsset: string): string {
    let imageUrl = '';
    switch (baseAsset) {
      case 'btc':
        imageUrl = 'assets/logo/btc.svg';
        break;
      case 'usdt':
        imageUrl = 'assets/logo/usdt.svg';
        break;
      case 'eth':
        imageUrl = 'assets/logo/eth.svg';
        break;
    }
    console.log(baseAsset);

    return imageUrl;
  }
}
