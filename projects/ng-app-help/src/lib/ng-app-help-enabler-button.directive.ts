import {Directive, HostListener} from '@angular/core';
import {NgAppHelpService} from "./ng-app-help.service";

@Directive({
  selector: '[ngAppHelpEnablerButton]'
})
export class NgAppHelpEnablerButtonDirective {

  constructor(private appHelpSvc: NgAppHelpService) {
  }

  @HostListener('click')
  onClick() {
    this.appHelpSvc.setAppHelpEnabled(!this.appHelpSvc.getAppHelpEnabled());
  }

}
