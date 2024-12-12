import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFinancialTransactionComponent } from './delete-financial-transaction.component';

describe('DeleteFinancialTransactionComponent', () => {
  let component: DeleteFinancialTransactionComponent;
  let fixture: ComponentFixture<DeleteFinancialTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFinancialTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteFinancialTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
