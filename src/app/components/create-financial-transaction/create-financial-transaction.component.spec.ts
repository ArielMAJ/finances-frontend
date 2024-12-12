import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancialTransactionComponent } from './create-financial-transaction.component';

describe('CreateFinancialTransactionComponent', () => {
  let component: CreateFinancialTransactionComponent;
  let fixture: ComponentFixture<CreateFinancialTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFinancialTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFinancialTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
