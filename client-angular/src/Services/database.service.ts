import { Injectable } from '@angular/core';
import axios from 'axios';
import { Stock } from 'src/Models/stock';
import { User } from 'src/Models/user';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  stocksDictionary: { [stockSymbol: string] : Stock} = {
    "BABA": {
      name: "Alibaba",
      price: 80.99,
      oneYearEstimate: 106.13,
    },
    "AMZN": {
      name: 'Amazon.com, Inc.',
      price: 3275.89,
      oneYearEstimate: 4000
    },
    "MSFT": {
      name: 'Microsoft Corporation',
      price: 285.45,
      oneYearEstimate: 300
    },
    "GOOGL": {
      name: 'Alphabet Inc.',
      price: 2325.12,
      oneYearEstimate: 2500
    },
    "AAPL": {
      name: 'Apple Inc.',
      price: 125.75,
      oneYearEstimate: 130.5
    }
  }

  Users: User[] = [
    {
      email: 'roei910@gmail.com',
      name: "roei daniel",
      lists: {
        "watching": {
          "BABA": {
            note: "buy when lower than 80",
            shares: [
              {
                amount: 10,
                averagePrice: 0
              }
            ]
          }
        },
        "owned": {
          "AAPL": {
            note: "",
            shares: [
              {
                amount: 10,
                averagePrice: 0
              },
              {
                amount: 10,
                averagePrice: 0
              }
            ]
          },
          "GOOGL": {
            note: "",
            shares: []
          },
          "MSFT": {
            note: "",
            shares: []
          },
          "AMZN": {
            note: "",
            shares: []
          },
          "BABA": {
            note: "",
            shares: []
          }
        },
        "list2": {
          "AMZN": {
            note: "",
            shares: []
          }
        }
      },
    },
  ];

  constructor() { }

  GetUser(email: string) {
    var found = this.Users.find((user: any) => user.email === email);

    return found;
  }

  async FindStocksBySearchTerm(searchTerm: string) {
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

  async AddStockNote(stocksType: string | undefined, email: string | null, symbol: string, note: string) {
    let user = this.Users.find((user: any) => user.email == email);

    if(user == undefined)
      return;

    user.lists[stocksType!][symbol].note = note;
  }

  async RemoveStockNote(stocksType: string | undefined, email: string | null, symbol: string){
    let user = this.Users.find((user: any) => user.email == email);

    if(user == undefined)
      return;
    
    user.lists[stocksType!][symbol].note = "";
  }
}