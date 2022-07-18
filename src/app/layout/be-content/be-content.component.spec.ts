import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeContentComponent } from './be-content.component';

describe('BeContentComponent', () => {
  let component: BeContentComponent;
  let fixture: ComponentFixture<BeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
