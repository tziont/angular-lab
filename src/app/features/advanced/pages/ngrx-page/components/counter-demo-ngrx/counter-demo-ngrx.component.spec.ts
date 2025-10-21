import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDemoNgrxComponent } from './counter-demo-ngrx.component';

describe('CounterDemoNgrxComponent', () => {
  let component: CounterDemoNgrxComponent;
  let fixture: ComponentFixture<CounterDemoNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterDemoNgrxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterDemoNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
