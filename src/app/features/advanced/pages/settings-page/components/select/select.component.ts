import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectOption, Settings, Value} from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input()
  key!: string;
  @Input()
  label!: string;
  @Input()
  options!: SelectOption[];
  @Input()
  control!: FormControl;

  isModified: boolean | undefined;
  destroy$ = new Subject<void>();

  ngOnInit(): void {
      const initialValue = this.control.value;
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isModified = value !== initialValue;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
