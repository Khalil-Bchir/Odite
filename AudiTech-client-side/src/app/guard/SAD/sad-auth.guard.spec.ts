import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sadAuthGuard } from './sad-auth.guard';

describe('sadAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sadAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
