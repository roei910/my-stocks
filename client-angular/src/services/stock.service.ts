import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor() { }

  async GetAllStocksAsync(){
    var res = await axios.get(`${environment.server_url}/Stock`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

    return res;
  }

  async GetStockBySymbolAsync(stockSymbol: string){
    var res = await axios.get(`${environment.server_url}/Stock/symbol/${stockSymbol}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res;
  }

  async GetStockByNameAsync(stockName: string){
    var res = await axios.get(`${environment.server_url}/Stock/name/${stockName}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res;
  }

  async FindStockByNameAsync(stockName: string){
    var res = await axios.get(`${environment.server_url}/Stock/find/name/${stockName}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res;
  }
}