import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CounterDualService {
  private _count = signal(0);
  count = this._count.asReadonly();

  private rxSubject = new BehaviorSubject<number>(0);
  rxCount$ = this.rxSubject.asObservable();

  increment() {
    this._count.set(this._count() + 1);
    this.rxSubject.next(this.rxSubject.value + 1);
  }

  reset() {
    this._count.set(0);
    this.rxSubject.next(0);
  }
}
