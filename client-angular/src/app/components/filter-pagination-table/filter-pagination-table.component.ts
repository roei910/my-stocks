import { Component, Input} from '@angular/core';
import { FilterPaginationHeaderConfiguration } from 'src/models/filterPaginationTable/filter-pagination-header-configuration';

@Component({
  selector: 'app-filter-pagination-table',
  templateUrl: './filter-pagination-table.component.html',
  styleUrls: ['./filter-pagination-table.component.css']
})
export class FilterPaginationTableComponent<ItemType> {
  ROWS_PER_PAGE: number = 5;

  @Input('Items') items!: ItemType[];
  @Input('HeaderConfiguration') headerConfiguration!: FilterPaginationHeaderConfiguration;

  startingIndex: number = 0;
  filterStringByField: { [field: string]: string } = {};
  filteredItems!: ItemType[];

  constructor() {}

  ngOnChanges(): void {
    this.FilterItems();
  }

  GetCurrentStocks(): ItemType[]{
    return this.filteredItems
      ?.slice(this.startingIndex, this.startingIndex+this.ROWS_PER_PAGE) ?? [];
  }

  PreviousPage(): void{
    if(this.startingIndex == 0)
      return;

    this.startingIndex-=this.ROWS_PER_PAGE;
  }

  NextPage(): void{
    if(this.startingIndex + this.ROWS_PER_PAGE >= (this.filteredItems?.length ?? 0))
      return;

    this.startingIndex+=this.ROWS_PER_PAGE;
  }

  FilterItemsByField(field: string){
    let fieldKey = field as keyof ItemType;

    if(fieldKey == undefined || fieldKey == null)
      return;

    if(this.IsFilterUsed(field))
    {
      delete(this.filterStringByField[field]);
      this.FilterItems();

      return;
    }

    let filterString = prompt("enter an expression to search by", "") ?? "";
    
    if(filterString.trim() == "")
      return;

    filterString = filterString.toLowerCase()

    this.filteredItems = this.filteredItems?.filter(stock => 
      stock[fieldKey]?.toString().toLowerCase().includes(filterString))
    this.filterStringByField[field] = filterString;
  }

  GetCurrentPage(): number{
    if(this.filteredItems == null)
      return 1;

    let currentPage = Math
      .floor((this.startingIndex * this.GetNumberOfPages()) / 
      this.filteredItems!.length) + 1;

    return currentPage;
  }

  GetNumberOfPages(): number{
    if(this.filteredItems == null)
      return 1;
    
    let numberOfPages = Math.ceil(this.filteredItems!.length / this.ROWS_PER_PAGE);

    return numberOfPages;
  }

  FilterItems(){
    this.filteredItems = this.items;

    Object.keys(this.filterStringByField).forEach(field => {
      let fieldKey = field as keyof ItemType;
      let filterString = this.filterStringByField[field];

      this.filteredItems = this.filteredItems?.filter(stock => 
          stock[fieldKey]?.toString().toLowerCase().includes(filterString))
    });
  }

  IsFilterUsed(field: string){
    var foundFilter = Object.keys(this.filterStringByField).find(filterField => 
      filterField == field
    );

    return foundFilter != undefined;
  }

  GetItemField(value: ItemType, field: string){
    var fieldKey = field as keyof ItemType;

    return value[fieldKey];
  }
}