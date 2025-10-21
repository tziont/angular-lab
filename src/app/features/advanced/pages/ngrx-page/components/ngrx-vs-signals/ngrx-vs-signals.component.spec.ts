import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxVsSignalsComponent } from './ngrx-vs-signals.component';

describe('NgrxVsSignalsComponent', () => {
  let component: NgrxVsSignalsComponent;
  let fixture: ComponentFixture<NgrxVsSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgrxVsSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxVsSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
