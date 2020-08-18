import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgAppHelpService {

  private appHelpEnabledSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public appHelpEnabled$: Observable<boolean> = this.appHelpEnabledSubject.asObservable();

  constructor(el: ElementRef) {

  }

  public setAppHelpEnabled(enabled: boolean) {
    this.appHelpEnabledSubject.next(enabled);
  }

  public getAppHelpEnabled(): boolean {
    return this.appHelpEnabledSubject.getValue();
  }
}
