import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Stock } from 'src/models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  lastUpdateTime!: Date;
  allStocks?: Stock[];

  constructor() {
    this.lastUpdateTime = new Date();
  }

  async GetAllStocksAsync(): Promise<Stock[]>{
    if(this.allStocks !== undefined && this.shouldBeUpdated(this.lastUpdateTime, new Date()))
      return this.allStocks;
    
    var res = await axios.get(`${environment.server_url}/Stock`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
    
    this.lastUpdateTime = new Date();
    
    return res;
  }

  async GetStockBySymbolAsync(stockSymbol: string): Promise<Stock>{
    var res = await axios.get(`${environment.server_url}/Stock/symbol/${stockSymbol}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));

    return res;
  }

  async GetStockByNameAsync(stockName: string): Promise<Stock>{
    var res = await axios.get(`${environment.server_url}/Stock/name/${stockName}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));

    return res;
  }

  async FindStockByNameAsync(stockName: string): Promise<Stock[]>{
    var res = await axios.get(`${environment.server_url}/Stock/find/name/${stockName}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));

    return res;
  }

  shouldBeUpdated(startTime: Date, endTime: Date): boolean {
    const differenceInMillis = endTime.getTime() - startTime.getTime();
    const thirtyMinutesInMillis = 30 * 60 * 1000;
    
    return differenceInMillis < thirtyMinutesInMillis;
  }
}