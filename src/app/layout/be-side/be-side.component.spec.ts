import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeSideComponent } from './be-side.component';

describe('BeSideComponent', () => {
  let component: BeSideComponent;
  let fixture: ComponentFixture<BeSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
