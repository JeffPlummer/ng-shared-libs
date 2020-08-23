import { NgAppHelpEnablerButtonDirective } from './ng-app-help-enabler-button.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgAppHelpService} from "./ng-app-help.service";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


// creating a test component in the spec file
@Component(
  {
    selector: 'fake-component',
    template: `
      <button id="enabler-button" ngAppHelpEnablerButton [helpTemplate]="showHelpFirstTime">Fake Button</button>
      <ng-template #showHelpFirstTime>First Time Help</ng-template>
    `
  }
)
class TestComponent {

}

describe('NgAppHelpEnablerButtonDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<any> ;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule],
      providers: [NgAppHelpService],
      declarations: [TestComponent, NgAppHelpEnablerButtonDirective]
    }).compileComponents();


    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const svc = TestBed.get(NgAppHelpService);
    const directive = new NgAppHelpEnablerButtonDirective(svc, null);
    expect(directive).toBeTruthy();
  });


  it('should update help enabled service when clicked', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const testDe: DebugElement = fixture.debugElement;
    const enablerButtonDe = testDe.query(By.css('#enabler-button'));

    expect(svc.getAppHelpEnabled()).toEqual(false);

    enablerButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(svc.getAppHelpEnabled()).toEqual(true);
  });


  it('should show first time help first time clicked.', async() => {
    localStorage.removeItem('hasShownFirstTimeHelp');
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const testDe: DebugElement = fixture.debugElement;
    const enablerButtonDe = testDe.query(By.css('#enabler-button'));

    expect(svc.getAppHelpEnabled()).toEqual(false);

    enablerButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalled();
  });


  it('should show first time help first time clicked but only one time.', async() => {
    localStorage.removeItem('hasShownFirstTimeHelp');
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const testDe: DebugElement = fixture.debugElement;
    const enablerButtonDe = testDe.query(By.css('#enabler-button'));

    expect(svc.getAppHelpEnabled()).toEqual(false);

    enablerButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalledTimes(1);

    enablerButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalledTimes(1); //Still only called that 1 time.
  });


  it('should show first time help on double click', async() => {
    localStorage.removeItem('hasShownFirstTimeHelp');
    const dlgSvc: MatDialog = TestBed.get(MatDialog);
    const dlgSpy = spyOn(dlgSvc, 'open').and.returnValue(null);

    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const testDe: DebugElement = fixture.debugElement;
    const enablerButtonDe = testDe.query(By.css('#enabler-button'));

    expect(svc.getAppHelpEnabled()).toEqual(false);

    enablerButtonDe.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalledTimes(1);

    enablerButtonDe.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(dlgSvc.open).toHaveBeenCalledTimes(2); //dble click resulted in second call
  });
});
