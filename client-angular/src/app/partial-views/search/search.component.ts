import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  stocksList: any = null;

  constructor(private stockService: StockService,
    private router: Router
  ) { }

  SearchResults(searchTerm: string) {
    this.stockService.FindStocksByName(searchTerm)
      .subscribe(stocks => this.stocksList = stocks);
  }

  NavigateStockInformation(symbol: string) {
    this.router.navigate(['stocks', 'information'], { queryParams: { stockSymbol: symbol }});
  }
}