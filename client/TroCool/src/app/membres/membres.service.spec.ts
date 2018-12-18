import { TestBed } from '@angular/core/testing';

import { MembresService } from './membres.service';

describe('MembresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [MembresService]
  }));

  it('should be created', inject([MembresService]), (service: MembresService) => {
    expect(service).toBeTruthy();
  });
});
