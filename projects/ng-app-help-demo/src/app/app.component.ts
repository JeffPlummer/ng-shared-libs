import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HelpModal1Component} from "./help-modals/help-modal1/help-modal1.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-app-help-demo';

  public testVar = "This is a test variable"

  public constructor(public dialog: MatDialog) {

  }

  public test() {
    console.log("Button was clicked");
  }
}
