// src/app/features/advanced/ngrx/state/ui.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UiState } from './ui.reducers';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectTheme = createSelector(
  selectUiState,
  state => state.theme
);
