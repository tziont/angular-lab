import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiForDebuggingComponent } from './ai-for-debugging.component';

describe('AiForDebuggingComponent', () => {
  let component: AiForDebuggingComponent;
  let fixture: ComponentFixture<AiForDebuggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiForDebuggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiForDebuggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
