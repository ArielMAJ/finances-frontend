import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionConfirmationModalComponent } from './deletion-confirmation-modal.component';

describe('DeletionConfirmationModalComponent', () => {
  let component: DeletionConfirmationModalComponent;
  let fixture: ComponentFixture<DeletionConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletionConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletionConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
