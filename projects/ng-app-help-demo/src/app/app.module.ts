import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgAppHelpModule} from "../../../ng-app-help/src/lib/ng-app-help.module";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    NgAppHelpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
