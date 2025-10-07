import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

// 1. Select the counter slice
export const selectCounterState = createFeatureSelector<CounterState>('counter');

// 2. Select just the count
export const selectCounterValue = createSelector(
  selectCounterState,
  (state: CounterState) => state.value
);
