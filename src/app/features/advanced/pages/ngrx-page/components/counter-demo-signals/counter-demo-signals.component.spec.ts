import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDemoSignalsComponent } from './counter-demo-signals.component';

describe('CounterDemoSignalsComponent', () => {
  let component: CounterDemoSignalsComponent;
  let fixture: ComponentFixture<CounterDemoSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterDemoSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterDemoSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
