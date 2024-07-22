import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-information',
  templateUrl: './stock-information.component.html',
  styleUrls: ['./stock-information.component.css']
})
export class StockInformationComponent implements OnInit {
  symbol?: string | null;
  stockData?: any;
  data?: any;

  constructor(private activatedRoute: ActivatedRoute) { 
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

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
    });

    // this.stockData = await this.dbService.GetStockInformation(this.symbol);
    // console.log(this.stockData);
  }
}