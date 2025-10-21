import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiForDocumentationComponent } from './ai-for-documentation.component';

describe('AiForDocumentationComponent', () => {
  let component: AiForDocumentationComponent;
  let fixture: ComponentFixture<AiForDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiForDocumentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiForDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
