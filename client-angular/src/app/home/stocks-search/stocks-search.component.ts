import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'services/stock.service';

@Component({
  selector: 'app-stocks-search',
  templateUrl: './stocks-search.component.html',
  styleUrls: ['./stocks-search.component.css']
})
export class StocksSearchComponent {
  stocksList: any = null;

  constructor(private stockService: StockService,
    private router: Router
  ) { }

  SearchResults(searchTerm: string) {
    this.stockService.FindStocksByNameAsync(searchTerm)
      .subscribe(stocks => this.stocksList = stocks);
  }

  NavigateStockInformation(symbol: string) {
    this.router.navigate(['stocks', 'information'], { queryParams: { stockSymbol: symbol }});
  }
}