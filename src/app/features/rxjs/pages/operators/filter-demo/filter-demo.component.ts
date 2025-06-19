import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, filter,map,startWith } from 'rxjs';
@Component({
  selector: 'app-filter-demo',
  standalone: false,
  templateUrl: './filter-demo.component.html',
  styleUrl: './filter-demo.component.scss'
})
export class FilterDemoComponent implements OnInit{
  inputControl = new FormControl('');
  filteredInput$!:  Observable<number>
  ngOnInit(): void {
    this.filteredInput$ = this.inputControl.valueChanges.pipe(
      filter(item => item!== null && item !== undefined),
      map(item => Number(item)),
      filter(item => !isNaN(item) && item > 10 ))
  }
}
