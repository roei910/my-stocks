import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksSearchComponent } from './stocks-search.component';

describe('StocksSearchComponent', () => {
  let component: StocksSearchComponent;
  let fixture: ComponentFixture<StocksSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StocksSearchComponent]
    });
    fixture = TestBed.createComponent(StocksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
