import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalManagementComponent } from './statistical-management.component';

describe('StatisticalManagementComponent', () => {
  let component: StatisticalManagementComponent;
  let fixture: ComponentFixture<StatisticalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
