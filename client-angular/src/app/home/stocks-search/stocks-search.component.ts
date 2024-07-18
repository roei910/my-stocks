import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/Services/database.service';
import { StockServiceService as StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-search',
  templateUrl: './stocks-search.component.html',
  styleUrls: ['./stocks-search.component.css']
})
export class StocksSearchComponent {

  stocksList: any = null;

  constructor(private database: DatabaseService,
    private router: Router
  ) { }

  async SearchResults(searchTerm: string) {
    this.stocksList = await this.database.SearchStocksByTermAsync(searchTerm);
  }

  NavigateStockInformation(symbol: string) {
    this.router.navigate(['stocks', 'information'], { queryParams: { stockSymbol: symbol }});
  }
}
