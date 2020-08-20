import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModal1Component } from './help-modal1.component';

describe('HelpModal1Component', () => {
  let component: HelpModal1Component;
  let fixture: ComponentFixture<HelpModal1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpModal1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpModal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
