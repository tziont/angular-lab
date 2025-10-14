
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadCounter, loadCounterSuccess } from './counter.actions';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class CounterEffects {
  loadCounter$;

  constructor(private actions$: Actions) {
    // Assign the effect here, after DI
    this.loadCounter$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadCounter),
        delay(1000),
        map(() => {
          const randomValue = Math.floor(Math.random() * 100);
          return loadCounterSuccess({ value: randomValue });
        })
      )
    );
  }
}


