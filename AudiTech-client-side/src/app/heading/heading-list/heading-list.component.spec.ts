import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingListComponent } from './heading-list.component';

describe('HeadingListComponent', () => {
  let component: HeadingListComponent;
  let fixture: ComponentFixture<HeadingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
