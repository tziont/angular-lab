import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsHomeComponent } from './signals-home.component';

describe('SignalsHomeComponent', () => {
  let component: SignalsHomeComponent;
  let fixture: ComponentFixture<SignalsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
