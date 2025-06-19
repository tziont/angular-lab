import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, delay, switchMap, map, startWith, of } from 'rxjs';

@Component({
  selector: 'app-switch-map-demo',
  standalone: false,
  templateUrl: './switch-map-demo.component.html',
  styleUrl: './switch-map-demo.component.scss',
})
export class SwitchMapDemoComponent implements OnInit {
  fakeDataFromServer = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Fig',
    'Grape',
    'Kiwi',
  ];
  searchControl = new FormControl('');
  searchResults$!: Observable<string[]>;
  fakeData$: Observable<string[]> = of(this.fakeDataFromServer);

  ngOnInit(): void {
    this.searchResults$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap((query) =>
        this.fakeData$.pipe(
          delay(1000),
          map((items) =>
            items.filter((item) =>
              item.toLowerCase().includes((query ?? '').toLowerCase())
            )
          )
        )
      )
    );
  }
}
