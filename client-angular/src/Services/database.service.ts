import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  Stocks: any = [
    {
      email: 'roei910@gmail.com',
      name: "roei daniel",
      stocksSymbol: ['AAPL'],
      watchingStocksSymbol: ['BABA'],
      stockNotes: [{ symbol: 'AAPL', message: 'buy when lower than 130' }],
      generalNotes: ["check the stock prices for something"]
    },
  ];
  constructor() {}

  GetStocks(email: string){
    return this.Stocks.find((stk: any) => stk.email === email);
  }
}
