import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFlagsListComponent } from './feature-flags-list.component';

describe('FeatureFlagsListComponent', () => {
  let component: FeatureFlagsListComponent;
  let fixture: ComponentFixture<FeatureFlagsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureFlagsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureFlagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
