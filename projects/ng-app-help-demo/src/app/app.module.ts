import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgAppHelpModule} from "../../../ng-app-help/src/lib/ng-app-help.module";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HelpModal1Component } from './help-modals/help-modal1/help-modal1.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpModal1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    NgAppHelpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HelpModal1Component]
})
export class AppModule { }
