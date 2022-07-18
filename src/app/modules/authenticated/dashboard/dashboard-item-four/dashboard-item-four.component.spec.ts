import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemFourComponent } from './dashboard-item-four.component';

describe('DashboardItemFourComponent', () => {
  let component: DashboardItemFourComponent;
  let fixture: ComponentFixture<DashboardItemFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
