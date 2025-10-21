import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalUiDemoComponent } from './global-ui-demo.component';

describe('GlobalUiDemoComponent', () => {
  let component: GlobalUiDemoComponent;
  let fixture: ComponentFixture<GlobalUiDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalUiDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalUiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
