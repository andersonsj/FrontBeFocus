import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemThreeComponent } from './dashboard-item-three.component';

describe('DashboardItemThreeComponent', () => {
  let component: DashboardItemThreeComponent;
  let fixture: ComponentFixture<DashboardItemThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardItemThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardItemThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
