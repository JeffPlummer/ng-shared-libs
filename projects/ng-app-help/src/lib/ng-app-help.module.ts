import { NgModule } from '@angular/core';
import { NgAppHelpEnabledDirective } from './ng-app-help-enabled.directive';
import { NgAppHelpEnablerButtonDirective } from './ng-app-help-enabler-button.directive';



@NgModule({
  declarations: [NgAppHelpEnabledDirective, NgAppHelpEnablerButtonDirective],
  imports: [

  ],
  exports: [NgAppHelpEnablerButtonDirective, NgAppHelpEnabledDirective]
})
export class NgAppHelpModule { }
