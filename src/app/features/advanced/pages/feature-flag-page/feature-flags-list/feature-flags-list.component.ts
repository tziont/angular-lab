import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IFeatureFlag } from '../../../../../types/feature-flag.model';

@Component({
  selector: 'app-feature-flags-list',
  standalone: false,
  templateUrl: './feature-flags-list.component.html',
  styleUrl: './feature-flags-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFlagsListComponent {
  @Input() flags: IFeatureFlag[] | null = null;

  @Output() toggle = new EventEmitter<IFeatureFlag>();
  @Output() delete = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<{
    flag: IFeatureFlag;
    value: string;
  }>();
  trackById(index: number, flag: IFeatureFlag): string {
    return flag._id;
  }

  onToggle(flag: IFeatureFlag): void {
    this.toggle.emit(flag);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onValueChange(flag: IFeatureFlag, event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  this.valueChange.emit({ flag, value });
}
}
