import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterDualService } from '../../../../../../core/services/counter-dual.services';

@Component({
  standalone: false,
  selector: 'app-rxjs-vs-signals',
 
  templateUrl: './rxjs-vs-signals.component.html',
   styleUrl:'./rxjs-vs-signals.component.scss',
})
export class RxjsVsSignalsComponent implements OnInit, OnDestroy {
  rxCount = 0;
  private subscription?: Subscription;

  constructor(public counterService: CounterDualService) {}

  ngOnInit(): void {
    this.subscription = this.counterService.rxCount$.subscribe(value => {
      this.rxCount = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
