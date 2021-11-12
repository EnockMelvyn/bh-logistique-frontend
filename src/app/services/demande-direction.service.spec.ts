import { TestBed } from '@angular/core/testing';

import { DemandeDirectionService } from './demande-direction.service';

describe('DemandeDirectionService', () => {
  let service: DemandeDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
