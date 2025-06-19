import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivesHomeComponent } from './directives-home.component';

describe('DirectivesHomeComponent', () => {
  let component: DirectivesHomeComponent;
  let fixture: ComponentFixture<DirectivesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectivesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectivesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
