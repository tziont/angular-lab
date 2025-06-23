import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../types/setting.model';
import { Value } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @Input()
  key!: string;
  @Input()
  label!: string;
  @Input()
  value!: Value;
  @Input()
  options!: SelectOption[];
  @Input()
  control!: FormControl;
  isModified: boolean | undefined;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.isModified = this.control.dirty;
    });
  }
}
