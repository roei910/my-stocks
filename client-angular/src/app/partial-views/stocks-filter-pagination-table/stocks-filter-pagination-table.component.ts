import { Component } from '@angular/core';
import { Stock } from 'src/models/stocks/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-filter-pagination-table',
  templateUrl: './stocks-filter-pagination-table.component.html',
  styleUrls: ['./stocks-filter-pagination-table.component.css']
})
export class StocksFilterPaginationTableComponent {
  stocks!: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.GetAllStocks()
      .subscribe(stocks => this.stocks = stocks);
  }
}