import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryAiComponent } from './sumary-ai.component';

describe('SumaryAiComponent', () => {
  let component: SumaryAiComponent;
  let fixture: ComponentFixture<SumaryAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumaryAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaryAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
