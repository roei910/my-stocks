import { Component } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';

@Component({
  selector: 'app-stocks-search',
  templateUrl: './stocks-search.component.html',
  styleUrls: ['./stocks-search.component.css']
})
export class StocksSearchComponent {
  stocksList: any = null;

  constructor(private database: DatabaseService) { }

  async SearchResults(searchTerm: string) {
    this.stocksList = await this.database.FindStocksBySearchTerm(searchTerm);
  }
}
