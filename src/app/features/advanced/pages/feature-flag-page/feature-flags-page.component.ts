// FeatureFlagPageComponent is actually FeatureFlagsContainer component

import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
  OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FeatureFlagService } from '../../../../core/services/feature-flag.service';
import { IFeatureFlag } from '../../../../types/feature-flag.model';
import { CreateFeatureFlagDto } from '../../../../core/services/feature-flag.service';  
import { Subscription } from 'rxjs';
import { Role } from '../../../../types/roles.model';

@Component({
  selector: 'app-feature-flags-page',
  standalone: false,
  templateUrl: './feature-flags-page.component.html',
  styleUrl: './feature-flags-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFlagsPageComponent implements OnDestroy, OnInit {
  private service = inject(FeatureFlagService);
  private fb = inject(FormBuilder);

  private subs: Subscription = new Subscription();

  private refresh(): void {
    this.flags$ = this.service.getAll(true);
  }

  flags$ = this.service.getAll();
  roles = ['admin', 'user', 'editor'];
  form = this.fb.nonNullable.group({
    key: ['', Validators.required],
    enabled: false,
    value: '',
    allowedRoles: this.fb.control<Role[]>([], Validators.required),
    description: '',
  });

  ngOnInit() {
  this.form.valueChanges.subscribe(v => console.log(v));
}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  create(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const flag: CreateFeatureFlagDto = {
      ...raw,
      allowedRoles: raw.allowedRoles!
    } ;

    this.subs.add(this.service.create(flag).subscribe(() => this.refresh()));
    this.form.reset({ enabled: false, allowedRoles: [] });
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
