import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksFilterPaginationTableComponent } from './stocks-filter-pagination-table.component';

describe('StocksFilterPaginationTableComponent', () => {
  let component: StocksFilterPaginationTableComponent;
  let fixture: ComponentFixture<StocksFilterPaginationTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StocksFilterPaginationTableComponent]
    });
    fixture = TestBed.createComponent(StocksFilterPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
