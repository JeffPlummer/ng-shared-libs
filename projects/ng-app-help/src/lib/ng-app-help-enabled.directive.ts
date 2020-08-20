import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, TemplateRef} from '@angular/core';
import {NgAppHelpService} from "./ng-app-help.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Directive({
  selector: '[ngAppHelpEnabled]'
})
export class NgAppHelpEnabledDirective implements OnInit, OnDestroy{

  @Input('highlightClass') highlightClass: string;
  @Input('helpTemplate') helpTemplate: TemplateRef<any>;

  private sub: Subscription;
  private timer;

  constructor(private appHelpSvc: NgAppHelpService,
              public dialog: MatDialog,
              private renderer: Renderer2,
              private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.sub = this.appHelpSvc.appHelpEnabled$.subscribe( (enabled) => {
      if(enabled) {
        this.renderer.addClass(this.elementRef.nativeElement, this.highlightClass);
      }
      else {
        this.renderer.removeClass(this.elementRef.nativeElement, this.highlightClass);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('mouseover')
  onMouseOver() {
    if(this.appHelpSvc.getAppHelpEnabled()){
      this.timer = setInterval( () => {
        const dialogRef = this.dialog.open(this.helpTemplate);
        clearInterval(this.timer);
      }, 1500)
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }


}
