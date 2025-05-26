import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPayComponent } from './result-pay.component';

describe('ResultPayComponent', () => {
  let component: ResultPayComponent;
  let fixture: ComponentFixture<ResultPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
