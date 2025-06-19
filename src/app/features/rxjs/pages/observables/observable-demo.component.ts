import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable-demo',
  standalone: false,
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.scss']
})
export class ObservableDemoComponent implements OnInit, OnDestroy {
  list = ["item 1", "item 2", "item 3", "item 4", "item 5", "item 6", "item 7"];
  messages: string[] = [];
  statusMessage: string = '';

  myObservable$!: Observable<string>;
  subscription!: Subscription;

  ngOnInit(): void {
    // Define an Observable that emits one item per second
    this.myObservable$ = new Observable<string>((observer) => {
      this.list.forEach((item, index) => {
        setTimeout(() => {
          observer.next(item);

          // Complete after the last item
          if (index === this.list.length - 1) {
            observer.complete();
          }
        }, index * 1000);
      });

      // Optional cleanup logic
      return () => {
        this.statusMessage = 'Observable stopped before completion.';
      };
    });
  }

  startObservable(): void {
    this.messages = [];
    this.statusMessage = 'Observable started...';

    this.subscription = this.myObservable$.subscribe({
      next: (item) => {
        this.messages.push(item);
      },
      complete: () => {
        this.statusMessage = 'Observable completed successfully.';
      },
      error: () => {
        this.statusMessage = 'An error occurred.';
      }
    });
  }

  stopObservable(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      // The status message is handled in the teardown logic
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
