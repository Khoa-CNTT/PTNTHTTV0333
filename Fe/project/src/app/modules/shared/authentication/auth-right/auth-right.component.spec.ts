import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRightComponent } from './auth-right.component';

describe('AuthRightComponent', () => {
  let component: AuthRightComponent;
  let fixture: ComponentFixture<AuthRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
