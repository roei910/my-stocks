import { Component } from '@angular/core';
import { ColumnDefinition } from 'src/models/filterPaginationTable/column-definition';
import { Stock } from 'src/models/stocks/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-filter-pagination-table',
  templateUrl: './stocks-filter-pagination-table.component.html',
  styleUrls: ['./stocks-filter-pagination-table.component.css']
})
export class StocksFilterPaginationTableComponent {
  stocks!: Stock[];

  stocksColumnDefinitions: ColumnDefinition[] = [
    {
      headerName: "name",
      isFilterAllowed: true,
      isOrderAllowed: true
    },
    {
      headerName: "symbol",
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
    this.stockService.GetAllStocks()
      .subscribe(stocks => this.stocks = stocks);
  }
}