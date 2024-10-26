import { Component } from '@angular/core';
import { MarketTrend } from 'src/models/marketTrends/market-trend';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.css']
})
export class MarketTrendsComponent {
  marketTrends!: MarketTrend[];
  selectedMarketTrend?: MarketTrend;

  constructor(private stockService: StockService) {
    this.stockService.getMarketsTrends()
      .subscribe(marketTrends => {
        this.marketTrends = marketTrends;
      });
  }

  generateMarketTrendName(trendName: string): string {
    let words = trendName.split('_').map(word => {
      let updatedWord = word[0].toUpperCase() + word.toLowerCase().slice(1);

      return updatedWord;
    });

    let updatedTrendName = words.join(" ");

    return updatedTrendName;
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}