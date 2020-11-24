/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ButtonService } from './button.service';

describe('Service: Button', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonService]
    });
  });

  it('should ...', inject([ButtonService], (service: ButtonService) => {
    expect(service).toBeTruthy();
  }));
});
