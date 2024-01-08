import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeadingComponent } from './update-heading.component';

describe('UpdateHeadingComponent', () => {
  let component: UpdateHeadingComponent;
  let fixture: ComponentFixture<UpdateHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateHeadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
