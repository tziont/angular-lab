import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map,startWith,tap } from 'rxjs';
@Component({
  selector: 'app-tap-demo',
  standalone: false,
  templateUrl: './tap-demo.component.html',
  styleUrl: './tap-demo.component.scss'
})
export class TapDemoComponent implements OnInit{
  inputControl = new FormControl<string>('');
  latestInput$!: Observable<string>;
  inputLog: string[] = [];

  ngOnInit(): void {
    this.latestInput$ = this.inputControl.valueChanges.pipe(
      startWith(''),
      tap(value => this.inputLog.push(value ?? '')), // record every input
      map(value => value ?? '') 
    ) ;
  }
}
