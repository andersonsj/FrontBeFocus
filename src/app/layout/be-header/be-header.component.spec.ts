import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeHeaderComponent } from './be-header.component';

describe('BeHeaderComponent', () => {
  let component: BeHeaderComponent;
  let fixture: ComponentFixture<BeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
