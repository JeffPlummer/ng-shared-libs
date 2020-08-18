import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAppHelpComponent } from './ng-app-help.component';

describe('NgAppHelpComponent', () => {
  let component: NgAppHelpComponent;
  let fixture: ComponentFixture<NgAppHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAppHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAppHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
