import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingDetailsComponent } from './heading-details.component';

describe('HeadingDetailsComponent', () => {
  let component: HeadingDetailsComponent;
  let fixture: ComponentFixture<HeadingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
