import { TestBed } from '@angular/core/testing';

import { NgAppHelpService } from './ng-app-help.service';

describe('NgAppHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgAppHelpService = TestBed.get(NgAppHelpService);
    expect(service).toBeTruthy();
  });
});
