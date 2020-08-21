import { NgAppHelpEnablerButtonDirective } from './ng-app-help-enabler-button.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgAppHelpService} from "./ng-app-help.service";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";


// creating a test component in the spec file
@Component(
  {
    selector: 'fake-component',
    template: `
      <button id="enabler-button" ngAppHelpEnablerButton>Fake Button</button>
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
      imports: [HttpClientTestingModule],
      providers: [NgAppHelpService],
      declarations: [TestComponent, NgAppHelpEnablerButtonDirective]
    }).compileComponents();


    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const svc = TestBed.get(NgAppHelpService);
    const directive = new NgAppHelpEnablerButtonDirective(svc);
    expect(directive).toBeTruthy();
  });


  it('should ', async() => {
    const svc: NgAppHelpService = TestBed.get(NgAppHelpService);
    const testDe: DebugElement = fixture.debugElement;
    const enablerButtonDe = testDe.query(By.css('#enabler-button'));

    expect(svc.getAppHelpEnabled()).toEqual(false);

    enablerButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(svc.getAppHelpEnabled()).toEqual(true);
  });
});
