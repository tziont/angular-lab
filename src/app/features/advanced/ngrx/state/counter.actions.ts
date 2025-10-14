import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

export const loadCounter = createAction('[Counter API] Load Counter');
export const loadCounterSuccess = createAction(
  '[Counter API] Load Counter Success',
  props<{ value: number }>()
);