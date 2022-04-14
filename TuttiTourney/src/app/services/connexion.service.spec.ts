import { TestBed } from '@angular/core/testing';

import { ConnexionService } from './connexion.service';

describe('ConnexionService', () => {
  let service: ConnexionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionService);
  });

  it('should be connected', () => {
    expect(service).toBeTruthy();
  });
});
