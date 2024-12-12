import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFinancialTransactionComponent } from './update-financial-transaction.component';

describe('UpdateFinancialTransactionComponent', () => {
  let component: UpdateFinancialTransactionComponent;
  let fixture: ComponentFixture<UpdateFinancialTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFinancialTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFinancialTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
