import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent {
  @Input('stocks')
  stocks: any;

  @Input('tableTitle')
  title: any;

  @Input('stocksDictionary')
  stocksDictionary: any;
}
