import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NgAppHelpService } from './ng-app-help.service';

describe('NgAppHelpService',  () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgAppHelpService = TestBed.get(NgAppHelpService);
    expect(service).toBeTruthy();
  });

  it('should update observable on change', fakeAsync(() => {
    const service: NgAppHelpService = TestBed.get(NgAppHelpService);

    let observableCallCount = 0;
    let lastObservableValue;
    service.appHelpEnabled$.subscribe( (value) => {
      observableCallCount++;
      lastObservableValue = value;
    });

    tick();
    expect(observableCallCount).toEqual(1);
    expect(lastObservableValue).toEqual(false);

    service.setAppHelpEnabled(true);
    tick();
    expect(observableCallCount).toEqual(2);
    expect(lastObservableValue).toEqual(true);
  }));

  it('should update get', fakeAsync(() => {
    const service: NgAppHelpService = TestBed.get(NgAppHelpService);

    expect(service.getAppHelpEnabled()).toEqual(false);
    service.setAppHelpEnabled(true);
    tick();
    expect(service.getAppHelpEnabled()).toEqual(true);
  }));


});
