import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersTasksComponent } from './others-tasks.component';

describe('OthersTasksComponent', () => {
  let component: OthersTasksComponent;
  let fixture: ComponentFixture<OthersTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthersTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
