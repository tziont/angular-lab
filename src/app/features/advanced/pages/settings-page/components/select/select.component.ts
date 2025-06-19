import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../types/setting.model';
import { Value } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements AfterViewInit, OnInit {
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
  @Input()
  options!: SelectOption[];
  isModified: boolean | undefined;

  selectControll = new FormControl();

  ngOnInit(): void {
    this.selectControll.valueChanges.subscribe((value) => {
      console.log('Selected value: ', value);
      this.isModified = this.selectControll.dirty;
      console.log('Is select dirty:', this.isModified);
    });
  }

  ngAfterViewInit(): void {
    this.selectControll.setValue(this.value);
  }
}
