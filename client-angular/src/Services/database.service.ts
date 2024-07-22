import { Injectable } from '@angular/core';
import axios from 'axios';
import { Stock } from 'src/models/stock';
import { User } from 'src/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // stocksDictionary: { [stockSymbol: string] : Stock} = {
  stocksDictionary: { [stockSymbol: string] : any} = {
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

  // Users: User[] = [
  Users: any[] = [
    {
      email: 'roei910@gmail.com',
      firstName: "roei",
      lastName: "daniel",
      password: "123456",
      watchingSymbols: {
        "watching": {
          "BABA": {
            note: "buy when lower than 80",
            shares: [
              {
                amount: 10,
                averagePrice: 3
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
                averagePrice: 3
              },
              {
                amount: 10,
                averagePrice: 5
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
            shares: [
              {
                amount: 20,
                averagePrice: 10
              }
            ]
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
    var found = this.Users.find((user: User) => user.email === email);
    
    return found;
  }

  //TODO: create in backend, move to the user service
  async AddStockNote(stocksType: string | undefined, email: string | null, symbol: string, note: string) {
    // let user = this.Users.find((user: any) => user.email == email);

    // if(user == undefined)
    //   return;

    // user.lists[stocksType!][symbol].note = note;
  }

  //TODO: create in backend, move to the user service
  async RemoveStockNote(stocksType: string | undefined, email: string | null, symbol: string){
    // let user = this.Users.find((user: any) => user.email == email);

    // if(user == undefined)
    //   return;
    
    // user.lists[stocksType!][symbol].note = "";
  }
}