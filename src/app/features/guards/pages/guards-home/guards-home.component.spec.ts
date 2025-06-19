import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardsHomeComponent } from './guards-home.component';

describe('GuardsHomeComponent', () => {
  let component: GuardsHomeComponent;
  let fixture: ComponentFixture<GuardsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
