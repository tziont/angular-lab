import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment } from '../../../../ngrx/state/counter.actions';
import { CounterState } from '../../../../ngrx/state/counter.reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-counter-demo',
  standalone: false,
  templateUrl: './counter-demo.component.html',
  styleUrl: './counter-demo.component.scss'
})
export class CounterDemoComponent {
  counter$: Observable<number>;
constructor(private store: Store<{ counter: CounterState }>) {
  this.counter$ = this.store.select(state => state.counter.value);
}

  onIncrement() {
    this.store.dispatch(increment());
  }
}
