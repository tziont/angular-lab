import { Component} from '@angular/core';
import { FormControl} from '@angular/forms';
import {  debounceTime, startWith,  distinctUntilChanged, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-practice',
  standalone: false,
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent  {

search = new FormControl('',{ nonNullable: true });




 private readonly searchTerm$ = this.search.valueChanges.pipe(
    startWith(this.search.value),
    debounceTime(300),
    distinctUntilChanged(),
    map((term) => term?.trim().toLowerCase())
  );

   resoults$ = this.searchTerm$.pipe(
    takeUntilDestroyed(),
    map(term => {
      if (!term || term.length < 3) return [];
      return this.mockData.filter(item =>
         item.name.toLowerCase().includes(term)
    );
}));

// Mock data for demonstration purposes
private readonly mockData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 40 }
];


}
