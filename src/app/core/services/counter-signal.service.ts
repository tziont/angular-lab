import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterSignalService {
  private _count = signal(0);

  count = this._count.asReadonly(); // expose as readonly

  increment() {
    this._count.update(v => v + 1);
  }

  reset() {
    this._count.set(0);
  }
}
