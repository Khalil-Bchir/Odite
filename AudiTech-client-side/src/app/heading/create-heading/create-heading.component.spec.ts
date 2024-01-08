import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeadingComponent } from './create-heading.component';

describe('CreateHeadingComponent', () => {
  let component: CreateHeadingComponent;
  let fixture: ComponentFixture<CreateHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHeadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
