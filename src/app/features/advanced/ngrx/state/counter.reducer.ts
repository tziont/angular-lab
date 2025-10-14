import { createReducer, on } from '@ngrx/store';
import { increment,decrement,loadCounterSuccess} from './counter.actions';
import { reset } from './counter.actions';

// State shape
export interface CounterState {
  value: number;
}

// Initial state
export const initialState: CounterState = {
  value: 0
};

// Reducer function
export const counterReducer = createReducer(
  initialState,
  on(increment, state => ({ ...state, value: state.value + 1 })),
  on(decrement, state =>({...state, value: state.value - 1})),
  on(reset, state=> ({...state, value: 0})),
  on(loadCounterSuccess, (state, { value }) => ({ ...state, value }))
);
