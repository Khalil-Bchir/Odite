import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuditComponent } from './create-audit.component';

describe('CreateAuditComponent', () => {
  let component: CreateAuditComponent;
  let fixture: ComponentFixture<CreateAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
