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
      watchingStocksSymbol: [
        {
          name: "Alibaba",
          symbol: "BABA",
          price: "80.99",
          oneYearEstimate: "106.13",
          note: "buy when lower than 80"
        }
      ],
      stocks: [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: 125.75,
            oneYearEstimate: '130.5'
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            price: 2325.12,
            oneYearEstimate: '2500'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            price: 285.45,
            oneYearEstimate: '300'
        },
        {
            symbol: 'AMZN',
            name: 'Amazon.com, Inc.',
            price: 3275.89,
            oneYearEstimate: '4000'
        }
    ]
    },
  ];

  constructor() {}

  GetStocks(email: string){
    var found = this.Stocks.find((stk: any) => stk.email === email);

    return found;
  }

  async FindStocksBySearchTerm(searchTerm: string){
    // var data = await axios.get(`https://localhost:7173/Stock/find/name/${searchTerm}`)
    // .then(res => res.data);
    var data = [
      {
        name: "apple",
        symbol: "aapl",
        price: 50,
        oneYearEstimate: 100
      },
      {
        name: "microsoft",
        symbol: "msft",
      }
    ];

    return data;
  }

  async GetStockInformation(symbol: string | null | undefined) {
    // var data = await axios.get(`https://localhost:7173/Stock/symbol/${symbol}`)
    // .then(res => res.data);
    var data = {
      name: "apple",
      symbol: "aapl",
      price: 50,
      oneYearEstimate: 100
    };

    return data;
  }
}