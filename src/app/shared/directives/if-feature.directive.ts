import { 
  Directive, Input, TemplateRef, ViewContainerRef, 
  inject, DestroyRef, OnInit 
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureFlagService } from '../../core/services/feature-flag.service';
import { FeatureKey } from '../../types/feature-flag.model';

@Directive({
  selector: '[ifFeature]',
  standalone: true
})
export class IfFeatureDirective implements OnInit {
  private readonly service = inject(FeatureFlagService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input('ifFeature') featureKey!: FeatureKey;
  @Input('ifFeatureElse') elseTemplate?: TemplateRef<any>;

  ngOnInit(): void {
    if (!this.featureKey) {
      console.error('ifFeature directive requires a featureKey');
      return;
    }

    this.service.isEnabled(this.featureKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(enabled => {
        this.vcr.clear();
        if (enabled) {
          this.vcr.createEmbeddedView(this.templateRef);
        } else if (this.elseTemplate) {
          this.vcr.createEmbeddedView(this.elseTemplate);
        }
      });
  }
}