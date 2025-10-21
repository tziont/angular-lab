// src/app/features/advanced/ngrx/pages/ngrx-vs-signals/counter-demo-ngrx.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment } from '../../../../ngrx/state/counter.actions';
import { selectCounterValue } from '../../../../ngrx/state/counter.selectors';

@Component({
  selector: 'app-counter-demo-ngrx',
  standalone: false,
  templateUrl: './counter-demo-ngrx.component.html',
  styleUrls: ['./counter-demo-ngrx.component.scss']
})
export class CounterDemoNgrxComponent {
  counter$: Observable<number>;

  constructor(private store: Store) {
    this.counter$ = this.store.select(selectCounterValue);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }
}

