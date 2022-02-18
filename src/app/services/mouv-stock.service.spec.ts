import { TestBed } from '@angular/core/testing';

import { MouvStockService } from './mouv-stock.service';

describe('MouvStockService', () => {
  let service: MouvStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
