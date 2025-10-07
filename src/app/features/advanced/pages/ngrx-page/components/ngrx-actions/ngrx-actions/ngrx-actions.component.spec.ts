import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxActionsComponent } from './ngrx-actions.component';

describe('NgrxActionsComponent', () => {
  let component: NgrxActionsComponent;
  let fixture: ComponentFixture<NgrxActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgrxActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
