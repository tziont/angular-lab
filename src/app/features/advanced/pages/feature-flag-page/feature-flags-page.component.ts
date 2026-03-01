// FeatureFlagPageComponent is actually FeatureFlagsContainer component

import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FeatureFlagService } from '../../../../core/services/feature-flag.service';
import { IFeatureFlag } from '../../../../types/feature-flag.model';
import { CreateFeatureFlagDto } from '../../../../core/services/feature-flag.service';  
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feature-flags-page',
  standalone: false,
  templateUrl: './feature-flags-page.component.html',
  styleUrl: './feature-flags-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFlagsPageComponent implements OnDestroy {
  private service = inject(FeatureFlagService);
  private fb = inject(FormBuilder);

  private subs: Subscription = new Subscription();

  private refresh(): void {
    this.flags$ = this.service.getAll(true);
  }

  flags$ = this.service.getAll();

  form = this.fb.nonNullable.group({
    key: ['', Validators.required],
    enabled: false,
    value: '',
    allowedRoles: ['', Validators.required],
    description: '',
  });

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  create(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const flag: CreateFeatureFlagDto = {
      ...raw,
      allowedRoles: raw.allowedRoles!.split(',').map((r) => r.trim()),
    } ;

    this.subs.add(this.service.create(flag).subscribe(() => this.refresh()));
    this.form.reset({ enabled: false });
  }

  toggle(flag: IFeatureFlag): void {
    this.subs.add(
      this.service
        .update(flag._id, { enabled: !flag.enabled })
        .subscribe(() => this.refresh()),
    );
  }

  updateValue({ flag, value }: { flag: IFeatureFlag; value: string }): void {
    this.subs.add(
      this.service.update(flag._id, { value }).subscribe(() => this.refresh()),
    );
  }

  delete(id: string): void {
    this.subs.add(this.service.delete(id).subscribe(() => this.refresh()));
  }
}
