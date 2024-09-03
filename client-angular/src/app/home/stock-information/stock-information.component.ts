import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'models/stocks/stock';
import { StockService } from 'services/stock.service';

@Component({
  selector: 'app-stock-information',
  templateUrl: './stock-information.component.html',
  styleUrls: ['./stock-information.component.css']
})
export class StockInformationComponent implements OnInit {
  symbol?: string | null;
  stock?: Stock;
  data?: any;
  //TODO: add button to add to a list

  constructor(private activatedRoute: ActivatedRoute,
    private stockService: StockService
  ) { 
      const tempData = [30, 25, 20, 15, 10];

      this.data = {
        labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'],
        datasets: [
          {
            // label: 'Sales',
            data: tempData,
            fill: true,
            borderColor: '#FFFFFF'
          }
        ]
      };
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
    });

    if(!this.symbol)
      return;

    this.stockService.GetStockBySymbolAsync(this.symbol)
      .subscribe(stock => this.stock = stock);
  }
}