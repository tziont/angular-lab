import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalErrorHandlingInterceptorComponent } from './global-error-handling-interceptor.component';

describe('GlobalErrorHandlingInterceptorComponent', () => {
  let component: GlobalErrorHandlingInterceptorComponent;
  let fixture: ComponentFixture<GlobalErrorHandlingInterceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalErrorHandlingInterceptorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalErrorHandlingInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
