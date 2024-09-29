import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnDefinition } from 'src/models/filterPaginationTable/column-definition';
import { MarketTrend } from 'src/models/marketTrends/market-trend';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.css']
})
export class MarketTrendsComponent implements OnInit {
  marketTrends?: Observable<MarketTrend[]>;
  stockNewsColumnDefinitions: ColumnDefinition[] = [
    {
      headerName: "articleTitle",
      isFilterAllowed: true,
      isOrderAllowed: true
    }
  ];

  trendingStockColumnDefinitions: ColumnDefinition[] = [
    {
      headerName: "symbol",
      isFilterAllowed: true,
      isOrderAllowed: true
    },
    {
      headerName: "name",
      isFilterAllowed: true,
      isOrderAllowed: true
    },
    {
      headerName: "price",
      isFilterAllowed: false,
      isOrderAllowed: true
    }
  ];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.marketTrends = this.stockService.GetMarketsTrends();
  }

  GenerateMarketTrendName(trendName: string): string {
    var words = trendName.split('_').map(word => {
      var updatedWord = word[0].toUpperCase() + word.toLowerCase().slice(1);

      return updatedWord;
    });

    var updatedTrendName = words.join(" ");

    return updatedTrendName;
  }
}