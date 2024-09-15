import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/models/stocks/stock';

@Component({
  selector: 'app-filter-pagination-table',
  templateUrl: './filter-pagination-table.component.html',
  styleUrls: ['./filter-pagination-table.component.css']
})
export class FilterPaginationTableComponent {
  ROWS_PER_PAGE: number = 5;
  STARTING_INDEX: number = 0;

  @Input('Stocks') stocks?: Observable<Stock[]>;
  // stocks: Stock[] = [
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Apple",
  //     id: '',
  //     symbol: 'aapl',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Microsoft",
  //     id: '',
  //     symbol: 'msft',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   },
  //   {
  //     name: "Mobileye",
  //     id: '',
  //     symbol: 'mbly',
  //     price: 0,
  //     updatedTime: new Date(Date.now())
  //   }
  // ]

  filteredStocks?: Stock[];

  filterStringByField: { [field: string]: string } = {};

  constructor() {}

  ngOnInit(): void {
    this.stocks?.subscribe(stocks => this.filteredStocks = stocks);
  }

  GetCurrentStocks(): Stock[]{
    return this.filteredStocks
      ?.slice(this.STARTING_INDEX, this.STARTING_INDEX+this.ROWS_PER_PAGE) ?? [];
  }

  PreviousPage(): void{
    if(this.STARTING_INDEX == 0)
      return;

    this.STARTING_INDEX-=this.ROWS_PER_PAGE;
  }

  NextPage(): void{
    if(this.STARTING_INDEX + this.ROWS_PER_PAGE >= (this.filteredStocks?.length ?? 0))
      return;

    this.STARTING_INDEX+=this.ROWS_PER_PAGE;
  }

  FilterStocksByField(field: string){
    let fieldKey = field as keyof Stock;

    if(fieldKey == undefined || fieldKey == null)
      return;

    if(this.IsFilterUsed(field))
    {
      delete(this.filterStringByField[field]);
      this.FilterStocks();

      return;
    }

    let filterString = prompt("enter an expression to search by", "") ?? "";
    
    if(filterString.trim() == "")
      return;

    filterString = filterString.toLowerCase()

    this.filteredStocks = this.filteredStocks?.filter(stock => 
      stock[fieldKey]?.toString().toLowerCase().includes(filterString))
    this.filterStringByField[field] = filterString;
  }

  GetCurrentPage(): number{
    if(this.filteredStocks?.length ?? 0 == 0)
      return 1;

    let currentPage = Math
      .floor((this.STARTING_INDEX * this.GetNumberOfPage()) / 
      (this.filteredStocks?.length ?? 0)) + 1;

    return currentPage;
  }

  GetNumberOfPage(): number{
    if(this.filteredStocks?.length ?? 0 == 0)
      return 1;

    let lastPage = Math.ceil((this.filteredStocks?.length ?? 0) / this.ROWS_PER_PAGE);

    return lastPage;
  }

  FilterStocks(){
    this.stocks?.subscribe(stocks => {
      this.filteredStocks = stocks;

      Object.keys(this.filterStringByField).forEach(field => {
        let fieldKey = field as keyof Stock;
        let filterString = this.filterStringByField[field];
  
        this.filteredStocks = this.filteredStocks?.filter(stock => 
            stock[fieldKey]?.toString().toLowerCase().includes(filterString))
      });
    });
  }

  IsFilterUsed(field: string){
    return Object.keys(this.filterStringByField).find(filterField => 
      filterField == field
    );
  }
}