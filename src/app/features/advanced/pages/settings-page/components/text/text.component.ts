import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Value } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text',
  standalone: false,
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent implements  OnInit {
  @Input()
  key!: string;
  @Input()
  label!: string;
  @Input()
  value!: Value;
  @Input()
  control!: FormControl;
  isModified: boolean | undefined;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {
      this.isModified = this.control.dirty;
    });
  }
}
