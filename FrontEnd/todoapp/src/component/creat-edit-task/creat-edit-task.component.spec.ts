import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEditTaskComponent } from './creat-edit-task.component';

describe('CreatEditTaskComponent', () => {
  let component: CreatEditTaskComponent;
  let fixture: ComponentFixture<CreatEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatEditTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
