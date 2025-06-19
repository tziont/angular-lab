import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Value } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-toggle',
  standalone: false,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent implements AfterViewInit, OnInit {
  @Input()
  key!: string;
  @Input()
  label!: string;
  @Input()
  roles!: string[];
  @Input()
  group?: string;
  @Input()
  value!: Value;
  isModified: boolean | undefined;

  toggleControl = new FormControl();

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((value) =>{
      console.log(`Value of ${this.label} is: `, value)
this.isModified = this.toggleControl.dirty;
  console.log('Is dirty:', this.isModified);
  });
  }
  ngAfterViewInit(): void {
    this.toggleControl.setValue(this.value);
    
  }
}
