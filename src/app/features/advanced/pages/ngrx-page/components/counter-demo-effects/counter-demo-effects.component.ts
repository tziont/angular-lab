import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCounter } from '../../../../ngrx/state/counter.actions';
import { selectCounterValue } from '../../../../ngrx/state/counter.selectors';

@Component({
  standalone: false,
  selector: 'app-counter-demo-effects',
  templateUrl: './counter-demo-effects.component.html',
  styleUrls: ['./counter-demo-effects.component.scss']
})
export class CounterDemoEffectsComponent {
  counter$: Observable<number>;

  constructor(private store: Store) {
    this.counter$ = this.store.select(selectCounterValue);
  }

  onLoadCounter() {
    this.store.dispatch(loadCounter());
  }
}

