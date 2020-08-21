import { NgAppHelpEnabledDirective } from './ng-app-help-enabled.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgAppHelpService} from "./ng-app-help.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

import * as sinon from 'sinon'
import {Component, DebugElement} from "@angular/core";
import {NgAppHelpEnablerButtonDirective} from "./ng-app-help-enabler-button.directive";
import {By} from "@angular/platform-browser";
import {Overlay} from "@angular/cdk/overlay";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// creating a test component in the spec file
@Component(
  {
    selector: 'fake-component',
    template: `
      <div id="my-root">
        <button id="enabled-button" ngAppHelpEnabled
                [highlightClass]="'my_highlight'"
                [helpTemplate]="testTemplate">Fake Enabled Button</button>

        <ng-template #testTemplate>
          <div id="added-text">this will be added as a modal</div>
        </ng-template>
      </div>
    `
  }
)
class TestComponent {

}

describe('NgAppHelpEnabledDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<any> ;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatDialogModule
      ],
      providers: [NgAppHelpService],
      declarations: [TestComponent, NgAppHelpEnabledDirective]
    }).compileComponents();


    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  it('should create an instance', () => {
    const svc = TestBed.get(NgAppHelpService);
    const dlgSvc = sinon.fake();
    const rendererFake = sinon.fake();
    const elementFake = sinon.fake();

    const directive = new NgAppHelpEnabledDirective(svc, dlgSvc, rendererFake, elementFake);
    expect(directive).toBeTruthy();
  });

  it('should add the highlight class when help is enabled.', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);

    //Prior - the added text template should not yet exist
    const testDe: DebugElement = fixture.debugElement;
    const modalText = testDe.query(By.css('#added-text'));
    expect(modalText).toBe(null);

    //Prior to hovering the highlight text should not exist
    const enabledButtonDe = testDe.query(By.css('#enabled-button'));
    expect(enabledButtonDe.classes['my_highlight']).toEqual(false);

    svc.setAppHelpEnabled(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const enabledButtonDe2 = testDe.query(By.css('#enabled-button'));
    expect(enabledButtonDe2.classes['my_highlight']).toEqual(true);
  });

  it('should open dialog if enabled and hover has been for more than 1.5 seconds', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    svc.setAppHelpEnabled(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled();

    //Prior - the added text template should not yet exist
    const testDe: DebugElement = fixture.debugElement;
    const modalText = testDe.query(By.css('#added-text'));
    expect(modalText).toBe(null);

    //Prior to hovering the highlight text should not exist
    const enabledButtonDe = testDe.query(By.css('#enabled-button'));
    expect(enabledButtonDe.classes['my_highlight']).toEqual(true);

    enabledButtonDe.triggerEventHandler('mouseover', null);
    await sleep(2000);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalled()
  });


  it('should not open dialog if enabled and hover less than 1.5 seconds', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    svc.setAppHelpEnabled(true);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled();

    //Prior - the added text template should not yet exist
    const testDe: DebugElement = fixture.debugElement;
    const modalText = testDe.query(By.css('#added-text'));
    expect(modalText).toBe(null);

    //Prior to hovering the highlight text should not exist
    const enabledButtonDe = testDe.query(By.css('#enabled-button'));
    expect(enabledButtonDe.classes['my_highlight']).toEqual(true);

    enabledButtonDe.triggerEventHandler('mouseover', null);
    await sleep(500);

    fixture.detectChanges();
    await fixture.whenStable();

    enabledButtonDe.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled()
  });


  it('should not open dialog if not enabled and hover has been for more than 1.5 seconds', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    svc.setAppHelpEnabled(false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled();

    //Prior - the added text template should not yet exist
    const testDe: DebugElement = fixture.debugElement;
    const modalText = testDe.query(By.css('#added-text'));
    expect(modalText).toBe(null);

    //Prior to hovering the highlight text should not exist
    const enabledButtonDe = testDe.query(By.css('#enabled-button'));
    expect(enabledButtonDe.classes['my_highlight']).toEqual(false);

    enabledButtonDe.triggerEventHandler('mouseover', null);
    await sleep(2000);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled();

    enabledButtonDe.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).not.toHaveBeenCalled();
  });
});
