import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksViewerComponent } from './stocks-viewer.component';

describe('StocksViewerComponent', () => {
  let component: StocksViewerComponent;
  let fixture: ComponentFixture<StocksViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StocksViewerComponent]
    });
    fixture = TestBed.createComponent(StocksViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
