// FeatureFlagPageComponent is actually FeatureFlagsContainer component

import {
  Component,
  ChangeDetectionStrategy,

  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // Standard for modern Angular
import { FeatureFlagService } from '../../../../core/services/feature-flag.service';
import { IFeatureFlag } from '../../../../types/feature-flag.model';
import { CreateFeatureFlagDto } from '../../../../core/services/feature-flag.service';
import { Subscription } from 'rxjs';
import { Role } from '../../../../types/roles.model';
import { FeatureKey } from '../../../../types/feature-flag.model';
import { KEYS } from '../../../../types/feature-flag.model';
@Component({
  selector: 'app-feature-flags-page',
  standalone: false,
  templateUrl: './feature-flags-page.component.html',
  styleUrl: './feature-flags-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFlagsPageComponent implements  OnInit {
  private service = inject(FeatureFlagService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef); // Inject the cleanup hook
 

  flags$ = this.service.flags$;
  roles = ['admin', 'user', 'editor'];
  keys = KEYS;

  form = this.fb.nonNullable.group({
    key: this.fb.control<FeatureKey | ''>('', Validators.required),
    enabled: false,
    value: '',
    allowedRoles: this.fb.control<Role[]>([], Validators.required),
    description: '',
  });

  ngOnInit() {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => console.log(v));
  }
  // ngOnDestroy(): void {
  //   this.subs.unsubscribe();
  // }

  create(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const flag: CreateFeatureFlagDto = {
      ...raw,
      allowedRoles: raw.allowedRoles!,
    };

    this.service
      .create(flag)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.form.reset({ enabled: false, allowedRoles: [] });
  }

  toggle(flag: IFeatureFlag): void {
   
      this.service.update(flag._id, { enabled: !flag.enabled })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateValue({ flag, value }: { flag: IFeatureFlag; value: string }): void {
    this.service.update(flag._id, { value })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  delete(id: string): void {
    this.service.delete(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }
}
