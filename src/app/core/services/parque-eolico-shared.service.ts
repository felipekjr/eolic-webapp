import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable(
  
)
export class ParqueEolicoSharedService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);   
  }
  getChange(): Observable<any> {
    return this.emitChangeSource.asObservable();
  }
}
