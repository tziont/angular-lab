import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Value, Settings } from '../../../../../../types/setting.model';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toggle',
  standalone: false,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent implements OnInit, OnDestroy {
  @Input()
  key!: string;
  @Input()
  label!: string;
  @Input()
  control!: FormControl;

  isModified: boolean | undefined;
  destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isModified = this.control.dirty;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
