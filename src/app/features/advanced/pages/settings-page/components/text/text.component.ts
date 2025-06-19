import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Value } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text',
  standalone: false,
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent implements AfterViewInit, OnInit {
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

  textControl = new FormControl();

  ngOnInit(): void {
    this.textControl.valueChanges.subscribe((value) =>{
      console.log('Text value: ', value);
    this.isModified = this.textControl.dirty;
    console.log('Is dirty:', this.isModified);
  });
    
  }
  ngAfterViewInit(): void {
    this.textControl.setValue(this.value);
  }
}
