import { TestBed } from '@angular/core/testing';

import { ConnectMembreService } from './connect-membre.service';

describe('ConnectMembreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers : [ConnectMembreService];
  }));

  it('should be created', inject([ConnectMembreService]), (service: ConnectMembreService)=> {
    expect(service).toBeTruthy();
  });
});
