import {Directive, Input, TemplateRef} from '@angular/core';
import {NgAppHelpService} from "./ng-app-help.service";

@Directive({
  selector: '[libNgAppHelpEnabled]'
})
export class NgAppHelpEnabledDirective {

  @Input('highlightClass') highlightClass: string;

  @Input('helpTemplate') helpTemplate: TemplateRef<any>;

  constructor(private appHelpSvc: NgAppHelpService) {

  }




}
