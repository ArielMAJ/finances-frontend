import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinancialTransactionDetailsComponent } from './view-financial-transaction-details.component';

describe('ViewFinancialTransactionDetailsComponent', () => {
  let component: ViewFinancialTransactionDetailsComponent;
  let fixture: ComponentFixture<ViewFinancialTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFinancialTransactionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFinancialTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
