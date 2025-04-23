import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportiveComponent } from './supportive.component';

describe('SupportiveComponent', () => {
  let component: SupportiveComponent;
  let fixture: ComponentFixture<SupportiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
