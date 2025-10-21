import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleTheme } from '../../../../ngrx/state/ui.actions';
import { selectTheme } from '../../../../ngrx/state/ui.selectors';

@Component({
  selector: 'app-global-ui-demo',
  standalone: false,
  templateUrl: './global-ui-demo.component.html',
  styleUrl: './global-ui-demo.component.scss'
})
export class GlobalUiDemoComponent {
  theme$: Observable<string>;

  constructor(private store: Store) {
     this.theme$ = this.store.select(selectTheme);
  }

  onToggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
