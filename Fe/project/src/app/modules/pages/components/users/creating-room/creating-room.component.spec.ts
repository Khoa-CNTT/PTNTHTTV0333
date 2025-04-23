import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingRoomComponent } from './creating-room.component';

describe('CreatingRoomComponent', () => {
  let component: CreatingRoomComponent;
  let fixture: ComponentFixture<CreatingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
