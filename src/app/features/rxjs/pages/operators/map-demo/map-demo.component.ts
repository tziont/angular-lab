import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map,startWith } from 'rxjs';
@Component({
  selector: 'app-map-demo',
  standalone: false,
  templateUrl: './map-demo.component.html',
  styleUrl: './map-demo.component.scss'
})
export class MapDemoComponent implements OnInit{
  inputControl = new FormControl('');
  inputString:string[] = [];
  lengthOfInputString$!: Observable<number>

  ngOnInit(): void {
    this.lengthOfInputString$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      map(item => item ? item.length : 0))
  }
}
