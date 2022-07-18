import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDataClientComponent } from './location-data-client.component';

describe('LocationDataClientComponent', () => {
  let component: LocationDataClientComponent;
  let fixture: ComponentFixture<LocationDataClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDataClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDataClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
