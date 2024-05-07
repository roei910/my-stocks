import { Injectable } from '@angular/core';
import axios from 'axios';

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
      generalNotes: ["check the stock prices for something"],
      stocks: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 125.75,
            prediction: '+10%'
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            price: 2325.12,
            prediction: '+15%'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            price: 285.45,
            prediction: '+8%'
        },
        {
            symbol: 'AMZN',
            name: 'Amazon.com, Inc.',
            price: 3275.89,
            prediction: '+12%'
        }
    ]
    },
  ];

  ;

  constructor() {}

  GetStocks(email: string){
    var found = this.Stocks.find((stk: any) => stk.email === email);

    return found;
  }

  async FindStocksBySearchTerm(searchTerm: string){
    var data = await axios.get(`https://localhost:7173/Stock/find/name/${searchTerm}`)
    .then(res => res.data);

    return data;
  }
}