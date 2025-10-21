import { Component, signal } from '@angular/core';
@Component({
  selector: 'app-counter-demo-signals',
  standalone: false,
  templateUrl: './counter-demo-signals.component.html',
  styleUrl: './counter-demo-signals.component.scss'
})
export class CounterDemoSignalsComponent {
  counter = signal(0);

  onIncrement() {
    this.counter.update(v => v + 1);
  }
}
