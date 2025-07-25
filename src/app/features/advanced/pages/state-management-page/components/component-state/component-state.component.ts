import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-component-state',
  standalone: false,
  templateUrl: './component-state.component.html',
  styleUrl: './component-state.component.scss'
})
export class ComponentStateComponent {
  // 🟢 Local state managed by signal
  counter = signal(0);

  // 🔁 Signal setter
  increment() {
    this.counter.update((value) => value + 1);
  }

  reset() {
    this.counter.set(0);
  }
}
