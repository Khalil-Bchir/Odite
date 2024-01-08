import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeadingComponent } from './delete-heading.component';

describe('DeleteHeadingComponent', () => {
  let component: DeleteHeadingComponent;
  let fixture: ComponentFixture<DeleteHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteHeadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
