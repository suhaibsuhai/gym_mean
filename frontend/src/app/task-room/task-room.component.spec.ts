import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRoomComponent } from './task-room.component';

describe('TaskRoomComponent', () => {
  let component: TaskRoomComponent;
  let fixture: ComponentFixture<TaskRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
