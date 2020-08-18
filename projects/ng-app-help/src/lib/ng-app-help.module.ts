import { NgModule } from '@angular/core';
import { NgAppHelpComponent } from './ng-app-help.component';
import { NgAppHelpEnabledDirective } from './ng-app-help-enabled.directive';



@NgModule({
  declarations: [NgAppHelpComponent, NgAppHelpEnabledDirective],
  imports: [

  ],
  exports: [NgAppHelpComponent]
})
export class NgAppHelpModule { }
