import { Component } from '@angular/core';

@Component({
  selector: 'app-stocks-search',
  templateUrl: './stocks-search.component.html',
  styleUrls: ['./stocks-search.component.css']
})
export class StocksSearchComponent {
  // stocksList: any[] = [];
  // stocksList: any = null;
  stocksList: any[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 125.75 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2325.12 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 285.45 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3275.89 },
  ];

  SearchResults(stockName: string){

  }
}
