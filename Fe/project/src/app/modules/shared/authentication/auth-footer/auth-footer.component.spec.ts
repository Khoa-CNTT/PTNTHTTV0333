import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFooterComponent } from './auth-footer.component';

describe('AuthFooterComponent', () => {
  let component: AuthFooterComponent;
  let fixture: ComponentFixture<AuthFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
