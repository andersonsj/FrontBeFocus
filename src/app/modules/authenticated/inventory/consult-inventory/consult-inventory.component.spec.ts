import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInventoryComponent } from './consult-inventory.component';

describe('ConsultInventoryComponent', () => {
  let component: ConsultInventoryComponent;
  let fixture: ComponentFixture<ConsultInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
