import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemTwoComponent } from './dashboard-item-two.component';

describe('DashboardItemTwoComponent', () => {
  let component: DashboardItemTwoComponent;
  let fixture: ComponentFixture<DashboardItemTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
