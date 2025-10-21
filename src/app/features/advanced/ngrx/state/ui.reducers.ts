// src/app/features/advanced/ngrx/state/ui.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { toggleTheme } from './ui.actions';

export interface UiState {
  theme: 'light' | 'dark';
}

// Initialize state from localStorage safely
const savedTheme = localStorage.getItem('theme');
export const initialUiState: UiState = {
  theme: savedTheme === 'dark' ? 'dark' : 'light', // only 'light' or 'dark'
};

export const uiReducer = createReducer(
  initialUiState,
  on(toggleTheme, state => {
    // toggle theme
    const newTheme: 'light' | 'dark' = state.theme === 'light' ? 'dark' : 'light';
    
    // persist to localStorage
    localStorage.setItem('theme', newTheme);

    // return new state
    return { ...state, theme: newTheme };
  })
);
