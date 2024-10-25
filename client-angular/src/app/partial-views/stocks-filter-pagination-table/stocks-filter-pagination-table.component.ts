import { Component } from '@angular/core';
import { Stock } from 'src/models/stocks/stock';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-filter-pagination-table',
  templateUrl: './stocks-filter-pagination-table.component.html',
  styleUrls: ['./stocks-filter-pagination-table.component.css'],
})
export class StocksFilterPaginationTableComponent {
  stocks!: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.GetAllStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
        console.log(this.stocks);
        
      });
  }

  sortTargetPriceChangePercent(event: any) {
    event.data.sort((a: Stock, b: Stock) => {
      const valueA = this.targetPriceChangePercentage(a);
      const valueB = this.targetPriceChangePercentage(b);
      
      const numA = valueA === "missing information" ? Number.NEGATIVE_INFINITY : parseFloat(valueA);
      const numB = valueB === "missing information" ? Number.NEGATIVE_INFINITY : parseFloat(valueB);

      let result = 0;
      if (numA < numB) result = -1;
      else if (numA > numB) result = 1;

      return event.order === 1 ? result : -result;
    });
  }

  targetPriceChangePercentage(stock: Stock){
    if(stock.analysis?.targetMeanPrice == undefined || stock.analysis?.targetMeanPrice == 0)
      return "missing information";

    let targetChangePercentage = (stock?.analysis?.targetMeanPrice / stock.price * 100 - 100).toFixed(2);

    return targetChangePercentage;
  }
}