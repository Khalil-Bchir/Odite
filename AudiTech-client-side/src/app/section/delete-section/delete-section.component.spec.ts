import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectionComponent } from './delete-section.component';

describe('DeleteSectionComponent', () => {
  let component: DeleteSectionComponent;
  let fixture: ComponentFixture<DeleteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
