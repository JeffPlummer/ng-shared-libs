import {Directive, HostListener, Input, TemplateRef} from '@angular/core';
import {NgAppHelpService} from "./ng-app-help.service";
import {MatDialog} from "@angular/material/dialog";

@Directive({
  selector: '[ngAppHelpEnablerButton]'
})
export class NgAppHelpEnablerButtonDirective {

  @Input('helpTemplate') helpTemplate: TemplateRef<any>;

  constructor(private appHelpSvc: NgAppHelpService, public dialog: MatDialog) {

  }

  @HostListener('click')
  onClick() {
    this.showFirstTimeHelpIfSpecified();
    this.appHelpSvc.setAppHelpEnabled(!this.appHelpSvc.getAppHelpEnabled());
  }

  private showFirstTimeHelpIfSpecified() {
      const hasSeenFirstTimeHelp: string = localStorage.getItem('hasShownFirstTimeHelp');
      if (!hasSeenFirstTimeHelp) {
        this.openFirstTimeTemplate();
      }
  }


  @HostListener('dblclick')
  onDoubleClick() {
    this.openFirstTimeTemplate();
  }



  private openFirstTimeTemplate() {
    if(this.helpTemplate) {
      const dialogRef = this.dialog.open(this.helpTemplate);
      localStorage.setItem('hasShownFirstTimeHelp', "true");
    }
  }

}
