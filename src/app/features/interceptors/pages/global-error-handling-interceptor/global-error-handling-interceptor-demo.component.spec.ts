import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalErrorHandlingInterceptorDemoComponent } from './global-error-handling-interceptor-demo.component';

describe('GlobalErrorHandlingInterceptorDemoComponent', () => {
  let component: GlobalErrorHandlingInterceptorDemoComponent;
  let fixture: ComponentFixture<GlobalErrorHandlingInterceptorDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalErrorHandlingInterceptorDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalErrorHandlingInterceptorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
