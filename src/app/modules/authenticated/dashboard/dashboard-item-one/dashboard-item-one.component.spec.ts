import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemOneComponent } from './dashboard-item-one.component';

describe('DashboardItemOneComponent', () => {
  let component: DashboardItemOneComponent;
  let fixture: ComponentFixture<DashboardItemOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
