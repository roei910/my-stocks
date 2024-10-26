import { Component } from '@angular/core';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  stocksList: any = null;

  constructor(private stockService: StockService
  ) { }

  searchResults(searchTerm: string) {
    this.stockService.findStocksByName(searchTerm)
      .subscribe(stocks => this.stocksList = stocks);
  }
}