import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeFooterComponent } from './be-footer.component';

describe('BeFooterComponent', () => {
  let component: BeFooterComponent;
  let fixture: ComponentFixture<BeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
