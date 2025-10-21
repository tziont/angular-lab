import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInWorkflowOptimizationComponent } from './ai-in-workflow-optimization.component';

describe('AiInWorkflowOptimizationComponent', () => {
  let component: AiInWorkflowOptimizationComponent;
  let fixture: ComponentFixture<AiInWorkflowOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiInWorkflowOptimizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiInWorkflowOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
