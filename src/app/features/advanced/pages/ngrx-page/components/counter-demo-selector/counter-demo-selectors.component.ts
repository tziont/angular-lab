import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../../../ngrx/state/counter.actions';;
import { selectCounterValue } from '../../../../ngrx/state/counter.selectors';

@Component({
  selector: 'app-counter-demo-selectors',
  standalone: false,
  templateUrl: './counter-demo-selectors.component.html',
  styleUrl: './counter-demo-selectors.component.scss'
})
export class CounterDemoSelectorsComponent {
  value$: Observable<number>;

  constructor(private store: Store) {
    this.value$ = this.store.select(selectCounterValue);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
