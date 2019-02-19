import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
@Injectable()
export class ComplexoEolicoSharedService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
    console.log(change)
  }
  getChange(): Observable<any> {
    return this.emitChangeSource.asObservable();
  }
}
