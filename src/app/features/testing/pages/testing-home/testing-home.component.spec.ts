import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingHomeComponent } from './testing-home.component';

describe('TestingHomeComponent', () => {
  let component: TestingHomeComponent;
  let fixture: ComponentFixture<TestingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
