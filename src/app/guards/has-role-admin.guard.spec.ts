import { TestBed } from '@angular/core/testing';

import { HasRoleAdminGuard } from './has-role-admin.guard';

describe('HasRoleAdminGuard', () => {
  let guard: HasRoleAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasRoleAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
