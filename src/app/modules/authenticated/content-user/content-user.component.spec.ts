import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentUserComponent } from './content-user.component';

describe('ContentUserComponent', () => {
  let component: ContentUserComponent;
  let fixture: ComponentFixture<ContentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
